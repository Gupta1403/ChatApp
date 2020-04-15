import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './home.css';


const Home = () => {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [roomId,setRoomId]=useState('');

  return (
    
    <div class="outercontainer">
      <div  class="jumbotron text-center bg-dark text-white">
        <h1 class="display-1">LET'S CONNECT HERE</h1>
        <h5>A new way to express yourself..</h5> 
      </div>
        
          <div class="container pt-5">
            
            <div class="row">
              <div class="col-md-12 text-white">
              
              <form>
                <div class="form-group">
                <label>Email</label>
                <input className="form-control" placeholder="Enter email"type="email" id="email" required onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                <label>Name</label>
                <input className="form-control" placeholder="Enter your name"type="text" name="name" id="name" required onChange={e=>setName(e.target.value)}/>
                </div>
                <div class="form-group">
                <label>RoomNo</label>
                <input className="form-control" placeholder="Enter roomId" type="text" name="roomId" id="roomId" required onChange={e=>setRoomId(e.target.value)}/>
                </div>
                <div class="form-group">
                <Link className="buttonlink" onClick={e=>(!email || !name || !roomId)? e.preventDefault():null} to={`/chat?email=${email}&name=${name}&roomId=${roomId}`}>
                  <button type="submit" class="btn btn-primary btn-lg">StartChat</button>
                </Link>
                </div>
                
              </form>
            </div>
            </div>
       </div>
    </div>
    
  );
}

export default Home;