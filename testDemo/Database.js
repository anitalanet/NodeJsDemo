
var mongoose = require('mongoose');
var userModel = require('./components/user/user.userModel')


function createDatabase(dbName) {
    mongoose.connect('mongodb://localhost/test')
}

function CreateUser(objUser) {
    var objUserNew = {username:"a",id :''};



    // var Schema = mongoose.Schema;
    //
    // var user = new Schema({
    //     user_id: String,
    //     user_name: String,
    //     user_profile_img_url : String,
    //     user_age : string,
    //     user_bdate:Date,
    //
    // });




   var userModel = mongoose.model('User', userModel );

}


