const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [
    {
      username: "Asir",
      email: "beginningtimes@gmail.com",
    },
    {
      username: "Love",
      email: "holditdown@gmail.com",
    },
  ];
  const thoughts = [
    {
      thoughtText: "life is ...",
      username: "Love",
    },
  ];

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
