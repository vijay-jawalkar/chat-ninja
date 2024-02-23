import React, { useState } from "react";
import {Link} from "react-router-dom"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();


  function setGuestCredentials(){
    setLogin((prev) => (
      {
        ...prev,
        email: "guest@Example.com",
        password: "12345678"
      }

    ))
  }

  
  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e){
    e.preventDefault();


    async function handleLogIn(){

    
     
      const authDetail = {
        email: login.email,
        password: login.password
      }
  
      
      const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authDetail)
      }

      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, requestOption)
      const json = await response.json()
      console.log(json)
     
      if(json.username){

       sessionStorage.setItem("name",json.name)
        toast('Login Successfull', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
          });
          navigate("/chat")
      }else{
        toast.warn('Incorrect email or password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
      
          });
      }
     
    }

    handleLogIn()
 
  }

  // function handleSubmit(e){
  //   e.preventDefault();
  //   console.log(login)
  // }


  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-screen py-3 text-zinc-200">
      
        <div className=" p-8 rounded-lg shadow-md w-[95%] md:w-96 h-[95%] md:h-auto bg-zinc-800 flex flex-col justify-center gap-4">
          <h2 className="text-center text-zinc-100 font-semibold text-xl mt-1 mb-4  px-2 py-1  mx-auto rounded-xl underline">
            Sign in to your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={login.email}
                onChange={handleInputChange}
                className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
              />
            </div>
            <div className="relative">
              <input
                  type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={login.password}
                onChange={handleInputChange}
                className=" mt-1 block w-full  bg-transparent border border-red-500 px-4 py-1 rounded-3xl"
              />
              <button 
            onClick={() => setShowPassword(!showPassword)}
            className='inline absolute right-3 top-3'>
              { showPassword ? <FaEye/> : <FaEyeSlash />}
            </button>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 w-full rounded-3xl font-semibold"
            >
              Log In
            </button>
            <button
             onClick={setGuestCredentials}
              className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 w-full rounded-3xl font-semibold"
            >
              Get Guest User Credentials
            </button>
          </form>

          <p className="mt-8 text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-red-400 px-4 hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
