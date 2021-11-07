const betaFitDAO = require('../models/betaFitModel');
const db =  new betaFitDAO();

exports.dashboard_display = function(req, res){
    res.send('<h1> Your Accomplishments</h1>');
    db.getAllAccomplishments();
}

exports.training_display = function(req, res){
    res.send('<h1> Your Training Information</h1>');
    db.getAllWorkouts();
}

exports.enter_goal = function(req, res){
    res.send('<h1> Enter a new Goal</h1>');
    
}

exports.landing_page = function(req, res){
    res.send('<h1> Welcome to BetaFit</h1>');
    res.render('dashboard', {
        'title': 'BetaFit Workouts'
    });
    
}