// // Using const as this variable won't change
// const express = require("express");

// // Connect app.js with router.js / router (refers to same file) - taking the router.js file and store it in a const -> I will get an output in the console (terminal): "I am executed immediately" written in router.js
// // This will immediately execute all of the code of router.js
// // const router = require('./router.js')

// // console.log(router)

// // To print the object from router.js
// // console.log(router.name)

// // passing seesion module inside as a parameter
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash")
// const app = express();
// // const express = require('express')

// let sessionOptions = session({
//     secret:"JS is awesome!",
//     store: MongoStore.create({ client:require("./db") }), 
//     resave: false, 
//     saveUninitialized: false,
//     cookies: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
// });

// // views are inside views folder - telling the express app which is our views folder
// app.set("views", "views");
// // setting ejs as a template / view engine
// app.set("view engine", "ejs");

// // telling express to use static content: css file
// app.use(express.static("public"));
// // telling express to use sessions using the cookies
// app.use(sessionOptions);
// app.use(flash());

// const router = require("./router");

// app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());

// // When there is arequest from this url, we call the "router" on router.js
// // Telling my app to use - a is the first parameter of USE method - URL, b is the router
// app.use("/", router);

// // When the user sends a get request to the home page, this function will execute - this will be written in router.js
// // app.get('/', function(req, res) {
// //     res.send("Welcome to our website!")
// // })

// // removing this (also from db.js) bcs it is added to the .env file
// // app.listen(3000)

// // needed for mongodb connection - exporting the app
// module.exports = app;

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.use(function (socket, next) {
  sessionOptions(socket.request, socket.request.res, next);
});

io.on("connection", function (socket) {
  // console.log("A new user connected!");
  if(socket.request.session.user) {
    let user = socket.request.session.user;
    socket.emit("welcome", {username: user.username, avatar: user.avatar});
    socket.on("chatMessageFromBrowser", function (data) {
      // console.log(data.message);
      socket.broadcast.emit("chatMessageFromServer", {
        message: data.message, 
        username: user.username, 
        avatar: user.avatar,
      });
    });
  }
});


let sessionOptions = session({
  secret: "JavaScript is sooooooooo coool",
  store: MongoStore.create({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
});

app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next) {
  console.log(req.session.user)
  res.locals.user = req.session.user;
  if(req.session.user){
    req.visitorId = req.session.user._id;
  }
  else {
    req.visitorId = 0;
  }
  next();
});

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = server;