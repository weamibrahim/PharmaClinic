import { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import "../App.css"
function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: null,
    password: "",
    confirmPassword:"" ,
    phone: "",
    address: "",
    specialization: "",
    

  })
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => { 
    const { name, value , files} = e.target
    if (name === "photo") {
      setUser({ ...user, [name]: files[0] })
    } else {
      setUser({ ...user, [name]: value })
    }
    }
    
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

    const formData = new FormData()
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key])
    })
      const response = await axios.post("http://localhost:3000/user/register", formData)
      console.log(response)
    navigate("/login")
  }
    catch (error) {
      console.log(error)
    }
  }
  




  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 background_reg">
      <div className="w-full  bg-white/45 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create account
          </h1>
          <form className="space-y-4 md:space-y-6  " onSubmit={handleSubmit}>
            <div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
              <input
                type="file"
                name="photo"
                id="photo"
             
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300  text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
               
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
              
              onChange={handleChange}
              className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
               />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
               
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input
                type="text"
                name="address"
                id="address"
               
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
              <input
                type="text"
                name="specialization"
                id="specialization"
               
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <div className="relative">
             
              <input
               type={showPassword ? "text" : "password"} 
                
                name="password"
                id="password"
              
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                />
                 <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-green-600'>{   showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}  </span>
            </div>
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <div className="relative">
              <input
                 type={showPassword ? "text" : "password"} 
                name="confirmPassword"
                id="confirmPassword"
              
                onChange={handleChange}
                className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
               />
                <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3  -translate-y-1/2 cursor-pointer text-green-600'>{   showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}  </span>
            </div>
            </div>
           <div className='flex justify-center my-3'>
           <button
              type="submit"
              className='bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'

              >Register</button>
              </div>
           </div>
             
                
          </form>
          <p className="text-sm font-light text-gray-400 dark:text-gray-400">
            Already have an account? <NavLink to="/login" className="font-medium text-green-600 hover:underline dark:text-green-400">Login here</NavLink>
          </p>
        </div>
      
      </div>
    </div>
  )
}

export default Register