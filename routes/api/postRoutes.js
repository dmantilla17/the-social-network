const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

router.route("/").get(getThoughts).update(updateThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

module.exports = router;
