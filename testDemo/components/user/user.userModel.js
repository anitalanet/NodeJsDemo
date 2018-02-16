var mongoose = require('mongoose');


const userModel = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
     type: String,
   },
  userEmail: {
    type: String,
    // required: true,
    unique: true
   },
  userPassword: {
     type: String,
  },
  userDOB: {
     type: String,
   },
  userImage: {
     type: String,
      default:""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
     type: Date,
      default: Date.now
  }
});


userModel.method({});

var user = mongoose.model('User', userModel);
// export default mongoose.model('User', userModel);
module.exports = user;
