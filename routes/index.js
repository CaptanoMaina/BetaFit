const express = require("express");
const router = express.Router();
const { checkAuth, checkGuest } = require("../middleware/auth");

const Training = require("../models/Training");

router.get("/", checkGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", checkAuth, async (req, res) => {
  try {
    const training = await Training.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      training,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

router.get("/weekly", checkAuth, async (req, res) => {
  try {
    const training = await Training.find({
      user: req.user.id,
      trainingStatus: "Incomplete",
    }).lean();
    res.render("weekly", {
      name: req.user.firstName,
      training,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
