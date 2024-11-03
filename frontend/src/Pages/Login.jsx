import React, { useState } from 'react'

import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useLogin } from '../Context/IsLoginContext';
import { useToast } from "../Context/ToastContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "../App.css"

function Login() {
  const { showToast } = useToast()
  const { setIsLogin, IsLogin } = useLogin();

  const vailidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Required")
  })

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {

    try {
      const response = await axios.post("https://pharmaclinic-production.up.railway.app/user/login", values);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === 'doctor') {
        navigate("/patients")
      } else if (response.data.user.role === 'pharmacist') {
        navigate("/allMedicines")
      }
      else {
        navigate("/users")
      }
      setIsLogin(true);
      showToast(response.data.message, "success");

    } catch (error) {

      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      setErrors({ serverError: errorMessage });
      console.error("Login error:", error);


    } finally {
      setSubmitting(false);
    }


  }


  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:items-center md:justify-center   mx-auto md:h-screen lg:py-0 ">
      <div className='background_login'>

      </div>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={vailidationSchema} onSubmit={handleSubmit} >

        {({ isSubmitting, errors }) => (
          <Form className="max-w-sm mx-auto">
            <div className="mb-5 ">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>

              <Field type="email" name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400 dark:shadow-sm-light" placeholder="name@flowbite.com" />
              <ErrorMessage
                name="email"
                component="div"
                className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"
              />
            </div>
            <div className="mb-5  ">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>

              <div className="relative">
                <Field type={showPassword ? "text" : "password"} name='password' id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400 dark:shadow-sm-light" />
                <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3  -translate-y-1/2 cursor-pointer text-green-600'>{showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}  </span>

              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"
              />
            </div>
            {errors.serverError && (
              <div className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.serverError}
              </div>
            )}

            <div className='flex justify-center'>

              <button type="submit" disabled={isSubmitting} className="text-white  bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-800">login</button>

            </div>
           
            <p className="text-sm font-light text-gray-400 dark:text-gray-400 my-2">
              Don’t have an account yet? <NavLink to="/register" className="font-medium text-green-600 hover:underline dark:text-green-400">Sign up</NavLink>
            </p>

            <p className="text-sm font-light text-gray-400 dark:text-gray-400 my-2 text-center">
              Forgot <NavLink to="/forgetPassword" className="font-medium text-green-600 hover:underline dark:text-green-400">password?</NavLink>
            </p>
          </Form>
          
        )}

      </Formik>

    </div>
  )
}

export default Login