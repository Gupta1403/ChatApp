import React,{useState,useEffect} from 'react';



const Privatechat = ({name,privateChatMsg,privateReceiver,getText}) => {
  const [text,setText]=useState('');
  const [texts,setTexts]=useState('');

  
console.log(name) 
  // const seeMsg=(e)=>{
  //   if(privateChatMsg.recText){
  //   let textvalue=privateChatMsg.recText;
  //   let textObj={name:privateChatMsg.name,text:textvalue}
  //   setTexts(texts => [ ...texts, textObj ]);
  //   console.log(textvalue)
  // }}
  console.log(texts)

  // function findUser( text){
  //   if(text.name===name.toLowerCase()){
  //     return(<div>
  //       <div style={{backgroundColor:"lightgreen",textAlign:"right"}}>
  //     <i>{text.name}</i>
  //     <h3>{text.text}</h3>
  //     </div>
  //     </div>)
  //   }else{
  //   return (
  //   <div>
  //     <div style={{backgroundColor:"lightblue"}}>
  //      <i>{message.user}</i>
  //     <h3>{message.text}</h3>
  //     </div>
  //   </div>
  //   )
  // }
  // }
  
useEffect(()=>{
  if(privateChatMsg){
    let textvalue=privateChatMsg.recText;
    let textObj={name:privateChatMsg.name,text:textvalue}
    setTexts(texts => [ ...texts, textObj ]);
  }
},[privateChatMsg])
  
const sendText=(e)=>{
  
  e.preventDefault();
  privateReceiver["chatText"]=text;
  let textObj={name:name,text:text}
  setTexts(texts => [ ...texts, textObj ]);
  console.log(privateReceiver)
  getText(privateReceiver);
  setText('');
}
  return (
    
    <div class="container">
      <div class="row">
        <div class="col-md-12 border">
          <div>
        {
          texts? 
          (
          <div>
            {texts.map((txt,i)=><div key={i}>
              {txt.name.toLowerCase()===name.toLowerCase() ? (<div class="bg-success"><i>{txt.name}</i>
              <h4>{txt.text}</h4></div>) : (<div class="bg-secondary"><i>{txt.name}</i>
                <h4>{txt.text}</h4></div>)}
              </div>)}
            </div>
            )
        :null
        }
      </div> 
        <div>
          <input type="text"  class="form-control"value={text} onChange={(e) => setText(e.target.value)} onKeyPress={e=>e.key==="Enter"? sendText(e):null}/>
         <button class="btn btn-block btn-primary" onClick={e=>sendText(e)}>SendPrivately</button>
       </div>
      </div>
      </div>
    </div>
  );
}

export default Privatechat;
