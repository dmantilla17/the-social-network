const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

module.exports = router;
