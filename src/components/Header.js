import React, { useEffect, useState } from 'react'
import Logo from "../images/chatNinja.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Header() {

    const [user, setUser] = useState("");
    const navigate = useNavigate();
   
    useEffect(() => {
       const name = sessionStorage.getItem("name");

       if(name){
        setUser(name)
     
       }

     
    }, [])

    function handleLogout(){
      sessionStorage.clear()
      setUser("");
 
      navigate("/")
    }

   

    console.log(user)

  return (
    <div className='flex justify-between pt-6 px-4  lg:px-28 text-zinc-100'>
    <div className='flex justify-center items-center gap-2'> 
        <img src = {Logo} alt = "logo" className='h-10 w-10 rounded-full border border-zinc-100' /> 
        <span className='text-zinc-200 font-semibold font-mono text-xl'>ChatNinja</span>
        </div>

        {
          sessionStorage.getItem("name") ?
          (
            <div className='flex justify-center items-center gap-4 font-semibold'>
          
        <Link to = "/" className='hover:text-zinc-200 cursor-pointer'> Hi { sessionStorage.getItem("name")} ! </Link>
        <Link
        onClick={handleLogout} 
        to = "/signup" 
        className='hover:text-zinc-200 cursor-pointer'> Logout </Link>
    </div>
          )
          :
          (
            <div className='flex gap-4 font-semibold'>
        <Link to = "/" className='hover:text-zinc-200 cursor-pointer'> Login </Link>
        <Link to = "/signup" className='hover:text-zinc-200 cursor-pointer'> Register </Link>
    </div>
          )
        }
 


    </div>
  )
}

export default Header
