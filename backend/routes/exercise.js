const router = require("express").Router();
const Exercise = require("../models/exercise");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("exercise deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  //console.log("asdasda");
  Exercise.findByIdAndUpdate(req.body.id, req.body)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.desccription;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;
      res.json(exercise);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
