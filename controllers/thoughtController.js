const { Thought, User } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find()
      // .exec()
      .then((thoughtPost) => res.json(thoughtPost))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtPost) =>
        !thoughtPost
          ? res.status(404).json({ message: "No Post found" })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtPost) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thought: thoughtPost._id } },
          { new: true }
        );
      })
      .then((users) => {
        res.json({ message: "Thought posted" });
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtPost) => {
        if (!thoughtPost) {
          return res
            .status(404)
            .json({ message: "Thought with this ID does not exist" });
        }
        res.json(thoughtPost);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtPost) => {
        if (!thoughtPost) {
          res.status(404).json({ message: "Thought Deleted baby" });
        }
      })
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
