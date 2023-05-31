const router = require("express").Router();
let User = require("../models/users");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("user added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  console.log("halua");
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
