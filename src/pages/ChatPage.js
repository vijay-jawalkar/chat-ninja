import React, { useState, useEffect, useRef } from 'react';
import UserLogo from "../images/user.png"
import AILogo from "../images/robot.png"
import { IoMdRefreshCircle } from "react-icons/io";

export const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([{
        model: null,
        message: ""
    }]);
   

    const messagesEndRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {

       

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                model: UserLogo,
                message: userInput
            }
        ]);

        setIsLoading(true)
      const getResult = async () => {
          try {
              const requestOption = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ prompt: userInput }) // Assuming userInput is the message to be sent
              };
  
              const response = await fetch(`${process.env.REACT_APP_HOST}/api/geminiai/chatbot`, requestOption);
              const json = await response.json();
              console.log(json);

              if(json.message){
 // const output = JSON.parse(json.response)
 setMessages((prevMessages) => [
    ...prevMessages,
    {
        model: AILogo,
        message: json.message
    }
]);
              }else{
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        model: AILogo,
                        message: json.message
                    }
                ]);
              }
             
           

           
              // setMessages(json.response.candidates[0].content.parts[0].text)
          } catch (error) {
              console.error("Error sending message:", error);
          }finally{
           setIsLoading(false)
          }
      };
  
      getResult();
  };


  function refreshBox(){
    setMessages([{
        model: null,
        message: ""
    }])
  }
  console.log(messages)
  

    return (
      <div className="h-screen flex justify-center items-center ">
      <div className="max-w-3xl w-full h-[80vh] bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col relative">
      <div 
          onClick={refreshBox}
          className='text-2xl cursor-pointer absolute right-4 top-4  text-zinc-200'> <IoMdRefreshCircle /> </div>
          <div className="flex-grow overflow-auto custom-scrollbar ">

         
              <div className="flex flex-col gap-2 text-white">

               
             
                 {
                  messages.map((value, index) => {
                        return (
                            <p key={index} className='flex gap-4 my-3'>   
                                <img src = {value.model} alt = "logo" className='h-5 w-5'/>
                                <span> {value.message} </span>
                            </p>
                        )
                    })
                 }

                {
                    isLoading && ( <p> Loading... </p>)
                }
                 <div ref={messagesEndRef}/>
              </div >
          </div>
          <div className="mt-4">
              <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type something..."
                  className="w-full bg-zinc-600 text-white border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                  onClick={sendMessage}
                  className="mt-2 w-full bg-blue-500 text-white rounded-lg py-2 px-4"
              >
                  Ask Your Question
              </button>
          </div>
      </div>
  </div>
  
    );
};


