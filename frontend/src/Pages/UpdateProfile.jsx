import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from "../Context/ToastContext";

function UpdateProfile() {
  const { showToast } = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [infoOfUser, setInfoOfUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    specialization: user.specialization,
    photo: user.photo, // Keep initial photo value from user object
  });
  console.log(infoOfUser.photo);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setInfoOfUser((prev) => ({ ...prev, photo: files[0] })); // Only set the file
    } else {
      setInfoOfUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(infoOfUser).forEach((key) => {
      formData.append(key, infoOfUser[key]);
    });

    
    try {
      const response = await axios.put(
        `http://localhost:3000/user/${user._id}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log(response.data);
      showToast(response.data.message, "success");
      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
    } catch (error) {
      console.error(error);
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="mx-auto sm:ml-64 mt-16">
      <div className="grid grid-cols-4 justify-between">
        <div className="col-span-1 sm:col-span-1 lg:col-span-1">
          <div className="bg-gray-200 p-4 h-full flex flex-col items-center">
            <img
              src={user.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 mt-10"
            />
            <h3 className="text-lg font-semibold my-5">{user.name}</h3>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <p className="text-gray-600 mb-4">{user.phone}</p>
            <p className="text-gray-600 mb-4 ">{user.address}</p>
            <p className="text-gray-600 mb-4 ">{user.specialization}</p>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-3 lg:col-span-3">
          <div className="bg-gray-300 p-4">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="w-full px-3 border-4 border-white-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={infoOfUser.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={infoOfUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={infoOfUser.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={infoOfUser.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="specialization"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={infoOfUser.specialization}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
