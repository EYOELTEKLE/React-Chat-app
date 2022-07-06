
import './App.css';
import Message from './image/Message.jpg';
import io from "socket.io-client"
import {useEffect, useState} from 'react';
function App() {
  const link = process.env.endpoint
  const [message,setMessage] = useState("");
  const [allChat, setChat] = useState([]);
  const [room, setRoom] = useState("");
  const [error,setError] = useState(false);
  const socket = io.connect(link)
  const sendMessage = () => 
  {
    if(room === "")
    {
      setError(true);
    }
    socket.emit("send_message",{message,room} )
  }
  const track = (e) => 
  {
    setMessage(e.target.value);
    
  }
  const joinRoom = () => 
  {
    if(room !== "")
    {
      socket.emit("join_room", room)
    }
  }
  useEffect(() => 
  {
    socket.on("recieve_message" , data => {
      
      //setRecieved(data.allChat);
      setChat(prev => [...prev, data.message])
      console.log(data.message)
      console.log(allChat);

      
})
  },[socket])
    return (
    <div className="App">
   <input type="text" placeholder="Insert Room Id" onChange= { (e) => setRoom(e.target.value)}/>
    <button className="join" onClick = {joinRoom}>Join Room</button>

      <div className="message">
      <img src={Message} alt="logo"/>
        <div className="message-card">
          
          <input onChange ={track}  type="text" placeholder="Enter your Message" />
          <button onClick={sendMessage}>Send Message</button>
       </div> 
      </div>
      <h1 className="name">Messages: </h1>
      <div className="wrapper">
            {

       allChat.map((item,index) => <div className="message-box" key={index}><span>Message-id:{index}</span> <h1 className="m1">{item}</h1> </div>)
      }
      </div>
      {
        error ? <div className="error" >
              <div className="modal">
                <button onClick = {() => setError(false)}className="close">x</button>
                <p1>Enter room Id!!</p1>
              </div>
                
        </div> : false
      }
    
    </div>
  );
}

export default App;
