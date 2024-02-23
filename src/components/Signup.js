import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

const [showPasswordOne, setShowPasswordOne] = useState(false)
const [showPasswordTwo, setShowPasswordTwo] = useState(false)

const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSignup((prev) => ({
      ...prev,
      [name]:  value
    }));

  }



   function handleSubmit(e){
    e.preventDefault();

   if(signup.password !== signup.confirmPassword){
    toast.warn('password and confirm-password should match!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "dark",
    
      });
   }

    async function handleRegister(){
      
      const authDetail = {
        name: signup.name, 
        username: signup.username, 
        email: signup.email, 
        password: signup.password
      }

      const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authDetail)
      }

      const response = await fetch("http://localhost:8000/api/auth/signup", requestOption);
      const json = await response.json();
      console.log(json)

      if(json.username){
        navigate("/")
      }
    }

    handleRegister()
   }
 

  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4 h-screen py-3 text-zinc-200">
     
      <div className=" p-8 rounded-lg shadow-md w-[95%] md:w-96 h-[95%] md:h-auto bg-zinc-800 flex flex-col justify-center gap-4">
        <h2 className="text-center text-zinc-100 font-semibold text-xl mt-1 mb-4  px-2 py-1  mx-auto rounded-xl underline">
          Create your free account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
              value={signup.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              required
              className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
              value={signup.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={signup.email}
              onChange={handleInputChange}
              className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
            />
          </div>
        
          <div className="relative">
            <input
              type={showPasswordOne ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={signup.password}
              onChange={handleInputChange}
              className=" mt-1  w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl   "
            />
            <button 
            onClick={() => setShowPasswordOne(!showPasswordOne)}
            className='inline absolute right-3 top-3'>
              { showPasswordOne ? <FaEye/> : <FaEyeSlash />}
            </button>
          </div>
          <div className="relative">
            
            <input
              type={showPasswordTwo ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={signup.confirmPassword}
              onChange={handleInputChange}
              className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
            />
              <button 
              onClick={() => setShowPasswordTwo(!showPasswordTwo)}
              className='inline absolute right-3 top-3'>
          { showPasswordTwo ? <FaEye/> : <FaEyeSlash />}
            </button>
          </div>
       

          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 w-full rounded-3xl font-semibold"
          >
            Sign Up
          </button>
         
        </form>

        <p className="mt-8 text-center">
          Already have an account ?{" "}
          <Link to = "/" className="text-red-400 px-4 hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}

export default Signup