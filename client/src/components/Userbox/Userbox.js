import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'



const Userbox = ({privatechat,users,name,email,roomId,sendReceiver}) => {
const [msgcounter,setmsgCounter]=useState([])



useEffect(()=>{
    if(users){
    users.map((user)=>{
      if(user.id===privatechat.id){
      let counterObj={id:user.id,counter:1}
      setmsgCounter( counterObj )
      }
    })
    }
},[privatechat])

// function badgevalue(user){
//   (msgcounter.id===user.id && msgcounter.counter>0)? msgcounter:null

//   return <div>{counterObj.counter}</div>
// }

// console.log(msgcounter)  
function eachUser(user){
    if(user.name!==name && user.email!==email){
    return(
    <button class="btn btn-link list-group-item list-group-item-action bg-light" 
    onClick={e=>{sendReceiver({user})}}>
    <h3>{user.name}</h3></button>
  )}
}

return (
    <div class="container">
   {
      users
        ? (
          <div>
            <h2> search bar to add</h2>
            
              <ul class="list-group">
                
                {users.map((user,i) => (
                  <li key={i}>{eachUser(user)}</li>
                ))}
              </ul>
            
          </div>
        )
        : <div>waiting for others to join</div>
    }
  </div>
    
  );
}

export default Userbox;