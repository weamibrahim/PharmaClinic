import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "../Context/ToastContext";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!password) {
            setError("Password is required");
            return;
        } else if (password.length <= 5) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await axios.post(
                "https://pharmaclinic-production.up.railway.app/user/reset-password",
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            showToast(response.data.message, 'success');
            navigate('/login');
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <div className='bg-dark p-6 rounded-md '>
                <input
                    type='text'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name='password'
                    className='p-2 border rounded-md   focus:border-green-500'
                />
                {error && (
                    <div
                        className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        {error}
                    </div>
                )}
                <button onClick={handleSubmit} className='mt-4 p-2 bg-green-500 text-white rounded-md'>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
