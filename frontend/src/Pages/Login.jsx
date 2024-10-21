import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useLogin } from '../Context/IsLoginContext';
import "../App.css"

function Login() {
  const { setIsLogin,IsLogin } = useLogin();
    const[user,setUser]=useState({
        email:"",
        password:""
    })

    const [showPassword, setShowPassword] = useState(false);

    const navigate=useNavigate()

   
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    const handleChange=(e)=>{
        const{name,value}=e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const response = await axios.post("http://localhost:3000/user/login", user);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          
    
          setIsLogin(true);
          
          
          
          navigate("/");
      } catch (error) {
          console.error("Login error:", error);
         
      }

       
    }
 

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:items-center md:justify-center   mx-auto md:h-screen lg:py-0 ">
 <div className='background_login'>
  
  </div>
    <form className="max-w-sm mx-auto">
      <div className="mb-5 ">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name='email' value={user.email} onChange={handleChange} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5  ">
        <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
       
       <div className="relative">
       <input    type={showPassword ? "text" : "password"}   name='password' value={user.password} onChange={handleChange} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400 dark:shadow-sm-light" required />
     <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3  -translate-y-1/2 cursor-pointer text-green-600'>{   showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}  </span>

        </div>
      </div>
     
      
      <div className='flex justify-center'>
      
    <button type="submit" onClick={handleSubmit} className="text-white  bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-800">login</button>
     
    </div>
    <p className="text-sm font-light text-gray-400 dark:text-gray-400 my-2">
        Don’t have an account yet? <NavLink to="/register" className="font-medium text-green-600 hover:underline dark:text-green-400">Sign up</NavLink>
    </p>
    </form>
   
    </div>
  )
}

export default Login