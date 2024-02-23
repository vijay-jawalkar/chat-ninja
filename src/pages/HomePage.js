import React, { useEffect } from 'react'
import Login from '../components/Login';


export function HomePage() {
 


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

 