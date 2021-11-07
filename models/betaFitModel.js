const Datastore = require('nedb');
const path = require('path');

class BetaFit{
    constructor (dbFilePath){
    if (dbFilePath) {
        this.db = new Datastore({filename: dbFilePath, autoload: true});
    } else {
        this.db = new Datastore();
    }}

   init() {
       this.db.insert({
           name: 'Margie',
           gender:'Female',
           age:'22',
           goal:'Gain Muscle',
           workout:'pull-ups',
           reps:'3'
 
       });

       this.db.insert({
        name: 'Njoks',
        gender:'Female',
        age:'20',
        goal:'Lose Weight',
        workout:'push-ups',
        reps:'3'

    });

       console.log('User information entered');
   } 


   getAllWorkouts(){
       return new Promise((resolve, reject) => {
            this.db.find({}, function(err, docs) {
                if (err) {
                    reject(err)
                    console.log('get all workouts promise rejected');
                } else{
                    resolve(docs);
                    console.log('get all workouts promise resolved', docs);
                }
            })
       })
   }

}

module.exports = BetaFit;