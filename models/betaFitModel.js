const Datastore = require('nedb');

class BetaFit{
    constructor (dbFilePath){
    if (dbFilePath) {
        this.db = new Datastore({filename:dbFilePath, autoload: true});
    } else {
        this.db = new Datastore();
    }}

   init(){
       this.db({
           name: '',
           gender:'',
           age:'',
 
       });

       console.log('User information entered');
   } 

}

module.exports = BetaFit