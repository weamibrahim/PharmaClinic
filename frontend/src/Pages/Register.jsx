import { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    photo: Yup.mixed().required("Photo is required"),
    password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    specialization: Yup.string().required("Specialization is required"),
  });


  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post("https://pharmaclinic-production.up.railway.app/user/register", formData);
      console.log(response);
      navigate("/login");
      showToast(response.data.message, "success");

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      setErrors({ serverError: errorMessage });

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full  lg:py-0 background_reg">
      <div className="w-full  my-16 bg-white/45 rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create account
          </h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              photo: null,
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
              specialization: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, errors }) => (
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={(event) => setFieldValue("photo", event.currentTarget.files[0])}
                    className='rounded-lg border w-full border-gray-300 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="photo" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <Field
                    type="text"
                    name="name"
                    className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="name" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <Field
                    type="email"
                    name="email"
                    className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="email" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="phone" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="address" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
                  <Field
                    type="text"
                    name="specialization"
                    className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                  />
                  <ErrorMessage name="specialization" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                    />
                    <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-green-600'>
                      {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                    </span>
                    <ErrorMessage name="password" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      className='rounded-lg border w-full border-gray-300 p-2.5 text-gray-900 focus:border-green-400 focus:ring-green-400'
                    />
                    <span onClick={togglePasswordVisibility} className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-green-600'>
                      {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                    </span>
                    <ErrorMessage name="confirmPassword" component="div" className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" />
                  </div>
                </div>
                {errors.serverError && (
                  <div className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errors.serverError}
                  </div>
                )}

                <div className='flex justify-center my-3'>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className='bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-sm font-light text-gray-400 dark:text-gray-400">
            Already have an account? <NavLink to="/login" className="font-medium text-green-600 hover:underline dark:text-green-400">Login here</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
