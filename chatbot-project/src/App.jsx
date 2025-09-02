import { useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

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
