const express=require('express');
const router = express.Router();
const userModel=require('./model');
// const {addUser,removeUser,getUser,getUsersInRoom}=require('./user')


router.get("/", (req, res) => {
    
  res.send({ response: "Server is running." }).status(200);
});

router.get('/clearDb',(req,res)=>{
  userModel.deleteMany().then((data)=>{
    if(data){
      res.send("Db is cleared successfully");
    }else{
      res.send("db is not cleared");
    }
  })
})
// router.get("/private", (req, res) => {
// const io=req.app.get('socketio');
// io.on("connect",(socket)=>{
//     socket.on("privatejoin",({email,name,roomId},callback)=>{
//         console.log(email,name,roomId)
//         const user=getUser()

//     })
// })
  
// });


module.exports = router;