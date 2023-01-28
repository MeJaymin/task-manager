const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database", error);
    }

    const db = client.db(databaseName);

    // db.collection("users").findOne({ name: "N", age: 1 }, (error, user) => {
    //   if (error) {
    //     return console.log("error", error);
    //   }
    //   console.log(user);
    // });

    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // const tasksData = [
    //   {
    //     description: "Installation of mongodb",
    //     completed: true,
    //   },
    //   {
    //     description: "Setup Mongodb GUI",
    //     completed: true,
    //   },
    //   {
    //     description: "Insert Document into mongo collection",
    //     completed: false,
    //   },
    // ];
    // db.collection("tasks").insertMany(tasksData, (error, result) => {
    //   if (error) {
    //     return console.log("Unable to insert tasks", error);
    //   }
    //   console.log(result);
    // });

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    // const updatePromise = db.collection("tasks").updateMany(
    //   {
    //     completed: false,
    //   },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // );

    // updatePromise
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const deletePromise = db.collection("users").deleteMany({ age: 27 });
    deletePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
