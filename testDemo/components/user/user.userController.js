var mongoose = require('mongoose');
var user = require('./user.userModel')
var checkMail = require('../../stringFunctions')



function  createUser(req, res) {


     if((checkMail.ValidateEmail(req.body.userEmail)) == false)
     {
        res.send({message:"Please enter proper email",statusCode:200,error:true})
        return;
     }

       (new user(req.body)).save()
        .then((result) => {
              console.log(result);
              res.send({message:'user sucessfully created',data:[result],error:false});
        })
         .catch((e) => {
                if(e.errmsg.match("duplicate key error"))
                {
                    res.send({message:"Email already exixt"});return;

                }
             res.send({message:e.errmsg});

         });
}

function updateUser(req,res)
{
    user.findOneAndUpdate({userEmail:req.body.userEmail},{$set:req.body},{new: true})
        .then((updateUser) => {
            res.send({message:'user sucessfully updated',data:[updateUser],error:false});
            console.log(updateUser);
        })
        .catch((e) => {
        res.send({message:"User Update Failed",statusCode:200,error:true});
          });
}

function deleteUser(req,res) {
    // get the user starlord55
    // user.find({userEmail:req.body.userEmail}, function(err, user) {
    //     if (err) throw err;
    //
    //     // delete him
    //     user.remove(function(err) {
    //         if (err) throw err;
    //         res.send({message:"User successfully deleted!",statusCode:200,error:true});
    //         console.log('User successfully deleted!');
    //     });
    // });



    user.findOneAndRemove({userEmail:req.body.userEmail})
        .then((user) => {


        if(user==null?res.send({message:"User already deleted!",statusCode:200,error:true}):res.send({message:"User sucessfully deleted!",statusCode:200,error:true}))

            console.log('User deleted!');
           // res.send({message:"User successfully deleted!",statusCode:200,error:true});
        })
        .catch((e) => {
            console.log('User deleted!');
            res.send({message:e.errmsg,statusCode:200,error:true});
        });


    // user.findOneAndRemove({userEmail:req.body.userEmail}, function(err) {
    //     if (err) throw err;
    //
    //     // we have deleted the user
    //
    // });

}

function getallUsers(req,res)
{
    user.find({},function (err,users) {
       if(err)
       {
           res.send({message:"No users found",statusCode:200,error:true});

       }
       else
       {
           res.send({message:"User founds",data:[users],statusCode:200,error:true});

       }
    })
}


function searchUsers(req,res) {
    var username = req.body.searchText;

    user.find({userName :  { $regex: username, $options: 'i' }},function (err,users) {
        if(err)
        {
            res.send({message:err,statusCode:200,error:true});

        }
        else
        {
            res.send({message:"User founds",data:users,statusCode:200,error:true});

        }
    });




}



module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getallUsers = getallUsers;
module.exports.searchUsers = searchUsers;