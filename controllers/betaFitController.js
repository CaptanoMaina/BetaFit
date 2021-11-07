const BetaFit = require('../models/betaFitModel');
const betaFitDAO = require('../models/betaFitModel');
const db =  new betaFitDAO('betaFit.db');
db.init();

exports.dashboard_display = function(req, res){
    res.send('<h1> Your Accomplishments</h1>');
    db.getAllAccomplishments();
}

exports.training_display = function(req, res){
    db.getAllWorkouts().then((list) => {
        res.render('betaFit', {
            'title' : 'BetaFit Workouts',
            'trainings': list
        });
        console.log('Promise resolved');
        
    }).catch((err) => {
        console.log('promise rejected', err);
    });
}

exports.enter_goal = function(req, res){
    res.send('<h1> Enter a new Goal</h1>');
    
}

exports.landing_page = function(req, res){
    db.getAllWorkouts().then((list) => {
        res.render('betaFit', {
            'title' : 'BetaFit Members',
            'profiles': list
        });
        console.log('Promise resolved');
        
    }).catch((err) => {
        console.log('promise rejected', err);
    });
    
}