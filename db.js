// // taking the mongodb module and store it in a const
// const mongodb = require("mongodb").MongoClient;
// // import dotenv after installing
// const dotenv = require("dotenv");
// // configure everything
// dotenv.config();

// // a - configuration string - stored in .env file because the password is confidential, so using a shortcut name
// // b - config property
// // c - function once the server is connected to mongodb, this will be executed
// mongodb.connect(
//   process.env.CONNECTIONSTRING,
//   { useUnifiedTopology: true },
//   function (err, client) {
//     // exporting
//     module.exports = client;
//     // importing / taking the app.js and storing it in a const so that I can make it listen in the next step (after exporting the app in app.js)
//     const app = require("./app");
//     // app.listen(3000)
//     // after adding port 3000 to env file, we now use a shortcut
//     app.listen(process.env.PORT);
//     console.log("Database connected...");
//   }
// );

const dotenv = require('dotenv')
dotenv.config()
const {MongoClient} = require('mongodb')

const client = new MongoClient(process.env.CONNECTIONSTRING)

async function start() {
  await client.connect()
  module.exports = client
  const app = require('./app')
  app.listen(process.env.PORT)
}

start()