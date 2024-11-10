
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useToast } from '../../Context/ToastContext';
function AllUser() {
  const { showToast } = useToast()
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([])

  
  const handleRoleChange = async (id, role) => {
    try {
      console.log(id)
    
      const response = await axios.put(`https://pharmaclinic-production.up.railway.app/user/role/${id}`, { role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      setUsers((prevUsers=>
        prevUsers.map((user) => 
          user._id === id ? { ...user, role } : user)
      
      ))
      showToast(response.data.message, 'success');
      console.log(response)

    } catch (error) {
      showToast(error.response.data.message, 'error');
      console.log(error);
    }
  }
  useEffect(() => {
    GetUsers();
  }, [page]);
  const GetUsers = async () => {
    try {
      const response = await axios.get(`https://pharmaclinic-production.up.railway.app/user?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const initialRoles = {}
      response.data.users.forEach(user => {
        initialRoles[user._id] = user.role

      });
    
      console.log(response.data);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }


  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://pharmaclinic-production.up.railway.app/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      GetUsers();
      showToast(response.data.message, 'success');

    } catch (error) {
      showToast(error.response.data.message, 'error');
      console.log(error);
    }
  }
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16 background_pharamcy">
      <div className="flex justify-between mb-4 my-10">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">All users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/20 border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">photo</th>
              <th className="py-2 px-4 border-b">name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">address</th>
              <th className="py-2 px-4 border-b">specialization</th>
              <th className="py-2 px-4 border-b">role</th>

              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (

              users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user, index) => (

                <tr key={index} className='text-center' >
                  <td className='flex justify-center'> <img src={user.photo}
                    className="w-12 h-12 me-3 rounded-full"
                    alt="FlowBite Logo" /></td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>

                  <td className="py-2 px-4 border-b">{user.address}</td>
                  <td className="py-2 px-4 border-b">{user.specialization}</td>
                  <td className="py-2 px-4 border-b">

                    <select

                      name='role'
                      value={user.role}
                      onChange={(e) => { handleRoleChange(user._id, e.target.value) }}
                      className='bg-transparent'
                    >
                      <option>select</option>
                      <option value="doctor">doctor</option>
                      <option value="admin">admin</option>
                      <option value="pharmacist">pharmacist</option>
                    </select>
                    
                  </td>
                  <td className='py-2 px-4 border-b'>  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-1 "
                  >
                    <MdDelete />
                  </button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">No prescriptions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      <nav aria-label="Page navigation example" className="flex justify-center mt-4">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
            >

              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => setPage(index + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${page === index + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
            >

              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AllUser