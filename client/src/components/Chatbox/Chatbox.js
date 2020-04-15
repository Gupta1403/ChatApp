import React from 'react';

const Chatbox = ({messages,name,email}) => {
  
  function findUser( message){
    if(message.user===name.toLowerCase() && message.email===email){
      return(<div>
        <div style={{backgroundColor:"lightgreen",textAlign:"right"}}>
      <i>{message.user}</i>
      <h3>{message.text}</h3>
      </div>
      </div>)
    }else{
    return (
    <div>
      <div style={{backgroundColor:"lightblue"}}>
       <i>{message.user}</i>
      <h3>{message.text}</h3>
      </div>
    </div>
    )
  }
  }
  return (
   
    <div class="container">
        
        <h1>Hi Welcome to Chatbox</h1>
        <div>
            {
            messages? (
              <div>
                {messages.map((message, i) => <div key={i}>{findUser(message)}</div>)}
              </div>
            ) : null}
            
        </div>
    </div>
  );
}

export default Chatbox;