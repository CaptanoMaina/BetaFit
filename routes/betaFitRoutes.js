const express = require('express');
const router = express.Router();
const controller = require('../controllers/betaFitController');

router.get("/", controller.landing_page);
router.get("/dashboard", controller.dashboard_display);
router.get("/training", controller.training_display);
router.get("/newgoal", controller.enter_goal);


router.use(function(req, res) {
    res.status(404);
    res.type('text/plain')
    res.send('404 Not Found');
})

router.use(function(err, req, res, next){
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error');
})

module.exports = router;