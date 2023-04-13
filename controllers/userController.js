const { User, Thought } = require("../models");

const userController = {
  //finds all of the users
  getUsers(req, res) {
    console.log(User);
    User.find()
      // .exec()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //looks for one user using the id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("Thought")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //creates users pur
  createUser(req, res) {
    console.log("Hello");
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }).then(() =>
      res.json({ message: "User Gone!" })
    );
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then((user) => res.json(user));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).then((user) => res.json(user));
  },
};

module.exports = userController;
