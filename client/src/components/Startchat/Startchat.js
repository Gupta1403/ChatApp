import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import Userbox from '../Userbox/Userbox';
import Chatbox from '../Chatbox/Chatbox';
import Privatechat from '../Privatechat/Privatechat'
import "./Startchat.css"
// import ScrollToBottom from 'react-scroll-to-bottom';

import io from "socket.io-client";

let socket;
const Startchat = ({location}) => {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [roomId,setRoomId]=useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [privateReceiver,setPrivateReceiver]=useState('')
  const [privatechatmsg,setPrivateChatMsg]=useState('');
  const ENDPOINT="/";

  useEffect(()=>{
    const {email,name,roomId}=queryString.parse(location.search);
    socket = io(ENDPOINT);
    console.log(socket);
    setName(name);
    setEmail(email);
    setRoomId(roomId);
    socket.emit('join', { email,name,roomId }, (error) => {
      if(error) {
        console.log("join"+error);
      }
    });
  },[ENDPOINT,location.search]);

  useEffect(() => {
    socket.on('message', message => {
      // setMessages(messages.push(message))
      setMessages(messages => [ ...messages, message ]);
      console.log(messages)
      console.log(message)
    });
    
    socket.on('privateText',({userFrom})=>{
      setPrivateChatMsg(userFrom);
      console.log(userFrom)
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users)
    });
}, []);
  
const sendText=(e)=>{
  e.preventDefault();
  if(message) {
    socket.emit('sendMessage', message, () => setMessage(''));
  }
}
const sendprivateText=(receiver)=>{
  const recObj={id:receiver.user.id,name:receiver.user.name,email:receiver.user.email,roomId:receiver.user.roomId}
  setPrivateReceiver(recObj);
}

const receiverChat=(privatechatObj)=>{
  socket.emit('startprivate',{privatechatObj},(error)=>{
  
  })
  
}
  return (
  <div>
    <div class="boxcontainer">
      <div className="jumbotron mt-3 p-1 text-center bg-dark text-white">
        <h1>You are in room :{roomId}</h1>
        <h2>{name}</h2>
        <h2>{email}</h2>
      </div>
    <div className="row">
    <div className="col-md-4 ">
      
      <div class="container border">
        <h1 class="bg-secondary text-center">PARTICIPANTS</h1>
        <div>
      <Userbox privatechat={privatechatmsg} users={users} name={name} email={email} roomId={roomId} sendReceiver={sendprivateText}></Userbox>
      </div>{
        privateReceiver ? (
          <Privatechat name={name} privateChatMsg={privatechatmsg} privateReceiver={privateReceiver} getText={receiverChat}></Privatechat>
        ) : null
      }
      
      </div>
    </div>

    <div className="col-md-8">
      
      <div class="container border">
      <div class="boxstyle">
      <Chatbox messages={messages} name={name} email={email}></Chatbox>
      </div>
      
      <div class="row">
      <div class="col-md-8 offset-md-1">
      <input type="text" class="form-control form-control-lg bg-dark text-white" placeholder="Type here......" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={e=>e.key==="Enter"? sendText(e):null}/>
      </div>
      <div class="col-md-2">
      <button class="btn btn-primary btn-block btn-lg" onClick={e=>sendText(e)}>Send</button>
      </div>
      </div>
      </div>
    </div>
  
</div>
</div>
    </div>
  );
}

export default Startchat;