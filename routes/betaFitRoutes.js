const express = require("express");
const shortId = require("shortid");
const router = express.Router();
const { checkAuth } = require("../middleware/auth");
const path = require("path");
const Training = require("../models/Training");

// @desc    Show add page
// @route   GET /training/add
router.get("/add", checkAuth, (req, res) => {
  res.render("training/add");
});

// @desc    Process add form
// @route   POST /training
router.post("/", checkAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Training.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show all training
// @route   GET /training
router.get("/", checkAuth, async (req, res) => {
  try {
    const training = await Training.find()
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("training/index", {
      training,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show single training
// @route   GET /training/:id
router.get("/:id", checkAuth, async (req, res) => {
  try {
    let training = await Training.findById(req.params.id)
      .populate("user")
      .lean();

    if (!training) {
      return res.render("error/404");
    }

    if (training.user._id != req.user.id) {
      res.render("error/404");
    } else {
      res.render("training/show", {
        training,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// @desc    Show edit page
// @route   GET /training/edit/:id
router.get("/edit/:id", checkAuth, async (req, res) => {
  try {
    const training = await Training.findOne({
      _id: req.params.id,
    }).lean();

    if (!training) {
      return res.render("error/404");
    }

    if (training.user != req.user.id) {
      res.redirect("/training");
    } else {
      res.render("training/edit", {
        training,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update training
// @route   PUT /training/:id
router.put("/:id", checkAuth, async (req, res) => {
  try {
    let training = await Training.findById(req.params.id).lean();

    if (!training) {
      return res.render("error/404");
    }

    if (training.user != req.user.id) {
      res.redirect("/training");
    } else {
      training = await Training.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete training
// @route   DELETE /training/:id
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    let training = await Training.findById(req.params.id).lean();

    if (!training) {
      return res.render("error/404");
    }

    if (training.user != req.user.id) {
      res.redirect("/training");
    } else {
      await Training.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
