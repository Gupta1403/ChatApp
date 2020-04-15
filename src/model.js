const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1/chatDb')
.then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  })



var userSchema= new mongoose.Schema({
    id:String,
    email:String,
    name:String,
    roomId:String,
    date:Date
});

var userModel = mongoose.model('userModel', userSchema);

module.exports=userModel;
       