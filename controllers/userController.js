const { User } = require("../models/User");

module.exports = {
  //finds all of the users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //looks for one user using the id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //creates users pur
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserdata) => res.json(dbUserdata))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
