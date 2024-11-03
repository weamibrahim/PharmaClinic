import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from "../Context/ToastContext";
function ForgetPassword() {
    const [email, setEmail] = useState("")
    const { showToast } = useToast()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email)
        try {
            const response = await axios.post("https://pharmaclinic-production.up.railway.app/user/forgot-password", { email })

            showToast(response.data.message, 'success')
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message, 'error')
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-dark p-6 rounded-md '>
                <input type="email" placeholder="Enter Email"
                    className='p-2 border rounded-md   focus:border-green-500'
                    onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
                <button
                    className='mt-4 p-2 bg-green-500 text-white rounded-md w'
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ForgetPassword