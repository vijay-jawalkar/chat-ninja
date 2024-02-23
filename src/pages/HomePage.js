import React, { useEffect, useState } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';

export function HomePage() {
    const [chats, setChats] = useState([]);


useEffect( () => {
    async function fetchChats(){
  const response = await fetch("http://localhost:8000/api/chat")
  const json = await response.json();
  console.log(json)
    }

    fetchChats()
}, [])
   
  return (
    <div>
      <Login/>
    </div>
  )
}

 