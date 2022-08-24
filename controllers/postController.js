const Post = require("../models/Post");

exports.viewCreateScreen = function(req, res) {
	res.render("create-post");
};
  
exports.create = function (req, res) {
	let post = new Post(req.body, req.session.user._id);
	console.log(req.session.user._id)
	post
		.create()
		.then(function () {
			res.redirect(`/profile/${req.session.user.username}`);
		})
		.catch(function (errors) {
			res.send(errors);
		});
};

exports.deletePost = function (req, res) {
	Post.delete(req.params.id)
		.then(() => {
			res.redirect(`/profile/${req.session.user.username}`);
		})
		.catch(() => {
			res.send("Couldn't delete the post!");
		});
};

exports.viewSingle = async function (req, res) {
	// res.render("single-post-page");
	// if there is no condition, we use try-cattch instead of if else
	try {
		let post = await Post.findSingleById(req.params.id);
		res.render("single-post-page", {post: post });
	} catch {
		res.send("Error 404");
	}
};

exports.viewEditPost = async function (req, res) {
	// res.render("single-post-page");
	// if there is no condition, we use try-cattch instead of if else
	try {
		let post = await Post.findSingleById(req.params.id);
	res.render("edit-post-page", {post: post });
	} catch {
		res.send("Error 404");
	}
};

exports.editPost = function (req, res) {
	// params.id comes from url, body and visitorid come from form
	let post = new Post(req.body, undefined, req.params.id);
	post
	.update()
	.then( () =>  {
		res.redirect(`/post/${req.params.id}/edit-post`);
		})
		.catch( () => {
			res.send("You can't edit this post!");
		});
};

exports.search = function (req, res) {
	Post.search(req.body.searchTerm)
	.then((posts) => {
		res.json(posts);
	})
	.catch(() => {
		res.json([]);
	});
};