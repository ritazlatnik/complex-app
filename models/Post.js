const postsCollection = require("../db").db().collection("posts");
const ObjectID = require('mongodb').ObjectID
const User = require("./User");

let Post = function (data, userid, requestedPostId) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
  this.requestedPostId = requestedPostId;
};

Post.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }

  // get rid of any bogus properties
  this.data = {
    title: this.data.title.trim(),
    body: this.data.body.trim(),
    createdDate: new Date(),
    author: ObjectID(this.userid),
  };
};

Post.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.title == "") {
      this.errors.push("You must provide a title.");
    }
    if (
      this.data.body == ""
    ) {
      this.errors.push("Please write the content of the blog post.");
    }
    if (this.data.title.length > 0 && this.data.title.length < 5) {
      this.errors.push("Title must be at least 5 characters.");
    }
    if (this.data.title.length > 150) {
      this.errors.push("Title cannot exceed 150 characters.");
    }
  });
};

Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp();
    this.validate();
    
    // Step #2: Only if there are no validation errors
    // then save the post into a database
    if (!this.errors.length) {
      // save post into database
      postsCollection
        .insertOne(this.data)
        .then(() => {
          resolve();
        })
        .catch(() => {
          this.errors.push("Please try again later.");
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

Post.delete = function (postIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      await postsCollection.deleteOne({ _id: new ObjectID(postIdToDelete) });
      resolve();
    } catch {
      reject();
    }
  });
};
  
Post.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      await postsCollection.findOneAndUpdate(
        {
          _id: new ObjectID(this.requestedPostId),
        },
        { $set: { title: this.data.title, body: this.data.body } }
      );
      resolve("Success");
    } catch {
      reject();
    }
  });
};
  
Post.findSingleByIdDuringUpdate = function(id, visitorId) {
  return new Promise(async function (resolve, reject) {
    // if id is not string or object id is not valid
    if(typeof id != "string" || !ObjectID.isValid(id)) {
      reject();
      return;
    }
    // check mongodb posts collection
    let post = await postsCollection.findOne({_id : new ObjectID(id) });
    if (post.authorID = visitorId) {
      resolve(post);
    } else {
      // if id is not found
      reject();
    }
  });
};

// searching for the id that's coming from the url
Post.findSingleById = function (id) {
  return new Promise(async function (resolve, reject) {
		// if id is not string or object id is not valid
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject();
      return;
    }
    // check mongodb posts collection
    //aggregate all the queries
    let posts = await Post.reusablePostQuery([
      { $match: { _id: new ObjectID(id) } },
    ]);

    if (posts.length) {
      console.log(posts[0]);
      resolve(posts[0]);
    } else {
      reject();
    }
  });
};

// Post.findByAuthorId = function (authorID) {
//   return Post.reusablePostQuery([
//     {$match: { author: authorID } },
//     //-1 -> descending order
//     {$sort: { createdDate: -1 } },
//   ])
// };

Post.findByAuthorId = function (authorId) {
  return Post.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } },
  ]);
};

// Post.reusablePostQuery = function (uniqueOperations, finalOperations = []) {
//   return new Promise(async function (resolve, reject) {
//     let aggOperation = uniqueOperations.concat([
//       {
//         $lookup: {
//           from: "users",
//           localField: "author",
//           foreignField: "_id",
//           as: "authorDocument",
//         },
//       },
//       {
//         $project: {
//           title: 1,
//           body: 1,
//           createdDate:1 ,
//           author: { $arrayElemAt : ["$authorDocument", 0] },
//         },
//       },
// 		]).concat(finalOperations);
		
// 		let posts = await postsCollection.aggregate(aggOperation).toArray();
		
// 		posts = posts.map(function (post) {
// 			post.author = {
// 				username: post.author.username,
// 				avatar: new User(post.author, true).avatar,
// 			};
// 		});
//     resolve(posts);
//   });
// };

Post.reusablePostQuery = function (
  uniqueOperations,
  visitorId,
  finalOperations = []
) {
  return new Promise(async function (resolve, reject) {
    let aggOperations = uniqueOperations
      .concat([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDocument",
          },
        },
        {
          $project: {
            title: 1,
            body: 1,
            createdDate: 1,
            authorId: "$author",
            author: { $arrayElemAt: ["$authorDocument", 0] },
          },
        },
      ])
      .concat(finalOperations);

    let posts = await postsCollection.aggregate(aggOperations).toArray();
    // console.log("Before:" + posts);

    posts = posts.map(function (post) {
      post.author = {
        username: post.author.username,
        avatar: new User(post.author, true).avatar,
      };
      return post;
    });
    // console.log("After: " + posts);
    resolve(posts);
  });
};

Post.search = function (searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == "string") {
      let posts = await Post.reusablePostQuery([
        {
          $match: { $text: { $search: searchTerm } },
        }],
        [{
          $sort: { score: { $meta: "textScore" } },
        },
      ]);
      console.log(posts)
      resolve(posts);
    } else {
      reject();
    }
  });
};

module.exports = Post;