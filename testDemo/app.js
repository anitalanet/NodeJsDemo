var express = require('express');
var bodyParser = require('body-parser');
var strFunction = require('./stringFunctions');
var mongoose = require('mongoose');
var createUser = require('./components/user/user.userController');
var updateUser = require('./components/user/user.userController');

var userRoute = require('./components/user/user.route');

mongoose.connect('mongodb://localhost:27017/test');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(userRoute);
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";


app.get('/', function (req, res) {
    res.send({message: "app is running"});

        console.log("Database created!");
        createUser.createUser();

});

app.get('/create', function (req,res) {
    mongoose.model('Test', {
        author: {
            type: String,
            index: true
        }
    });

})

app.post('/update',function (req,res) {
    updateUser.updateUser(req,res);
})

app.post('/deleteUser',function (req,res) {
    updateUser.deleteUser(req,res);
})

app.get('/getAllUsers',function (req, res) {
    updateUser.getallUsers(req,res);
})

app.post('/searchUser',function (req,res) {
    updateUser.searchUsers(req,res)
})

app.post('/checkEmail', function (req, res) {

   var email = req.body.mail;
   var isValid = strFunction.ValidateEmail(email);

   if(isValid)
   {
       res.send({response: "Please proceed"});
   }
   else
   {
       res.send({response: "Stopped"});
   }


});

app.post('/countCharacters',function (req,res) {

    var charC = req.body.char;
    var msg = req.body.msg;
    var counter = 0;

    for (var i = 0 ; i < msg.length;i++)
    {
        var c = msg.charAt(i);
        if(c.match(charC))
        {
            counter = counter + 1;
        }
    }
    console.log("count of char is",counter);
    res.send({response: "count of char is " +counter});

});

app.post('/ASC', function (req,res) {

    var string = req.body.string;
    res.send({message: strFunction.ASCOrder(string)});
});



app.put('/PUT',function (req,res) {

    res.send(req.body.param)
});

app.delete('/DEL',function (req,res) {
    res.send(req.body.param)

});




app.listen(8080, '0.0.0.0');