const { Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
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
};
