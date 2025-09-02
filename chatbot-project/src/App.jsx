import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import RobotProfileImg from './assets/robot.png'
import UserProfileImg from './assets/user.png'
import './App.css'


    function ChatInput({chatMessages, setChatMessages }){
      const [inputText, setInputText] = useState('');

      function saveInputText(event){
        setInputText(event.target.value);
      }

      function sendMessage(){
        const newChatMessages = [
          //copy of chat messages array
            ...chatMessages,
            {
              message: inputText,
              sender: "user",
              id: crypto.randomUUID()
            }
         ]
        setChatMessages(newChatMessages);

        const response = Chatbot.getResponse(inputText)

        setChatMessages([
          //copy of chat messages array
            ...newChatMessages,
            {
              message: response,
              sender: "robot",
              id: crypto.randomUUID()
            }
         ]);

         setInputText('')
      }

      return(
        <div className="chat-input-container">
          <input 
            placeholder="Send a message to Chatbot" 
            size="30"
            onChange={saveInputText}
            value={inputText}
            className="chat-input"
          />
          <button
            onClick={sendMessage}
            className="send-btn"
          >
          Send
          </button>
        </div>
      );
    }

    function ChatMessage({message, sender}){
      // const message = props.message;
      // const sender = props.sender;

      // const{message, sender} = props;

      /* if (sender === 'robot'){
        return(
          <div>
            <img src="robot.png" width="50"/>
            {message}
        </div>
        );
      } */

      return(
        <div className={
          sender === 'user' 
            ? 'chat-message-user' 
            : 'chat-message-robot'
          }>
          {sender === 'robot' && (
            <img src={RobotProfileImg}
             className="chat-message-pic"
            />
          )}
          <div className="chat-text">
          {message}
          </div>
          {sender === 'user' && (
            <img src={UserProfileImg}
             className="chat-message-pic"
            />
          )}
        </div>
      );
    }

    function ChatMessages({chatMessages}){

      const chatMessagesRef = useRef(null);

      useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem){
          containerElem.scrollTop = containerElem.scrollHeight;
        }
      }, [chatMessages])

        return(
          <div className="chat-messages-container" 
          ref={chatMessagesRef}>
            {chatMessages.map((chatMessage)=>{
                return(
                  <ChatMessage 
                    message = {chatMessage.message}
                    sender = {chatMessage.sender}
                    key = {chatMessage.id}
                  />
                );
              })}
          </div>
        );
    }

function App(){ 
      const [chatMessages, setChatMessages] = useState([{
          message: 'Hello Chatbot',
          sender: 'user',
          id: 'id1'
        },
        {
          message: 'Hello! How can i help you',
          sender: 'robot',
          id: 'id2'
        },
        {
          message: "Can you get me today's date?",
          sender: 'user',
          id: 'id3'
        },
        {
          message: 'Today is 30th July, 2022',
          sender: 'robot',
          id: 'id4'
        }]);
      // const [chatMessage, setChatMessages] = array;
      // const chatMessages = array[0]; //current data
      // const setChatMessages = array[1]; //function to change the data

      return(
        <div className="app-container">
          <ChatMessages 
            chatMessages={chatMessages} 
          />
          <ChatInput 
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      );
    }

export default App
