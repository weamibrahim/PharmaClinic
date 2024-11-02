import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useToast } from "./../../Context/ToastContext";
import "../../App.css"
function Patients() {
  const { showToast } = useToast();
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPatients();
  }, [page]); 

  const getPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/patient?page=${page}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPatients(response.data.patients);
      // setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
   const response =   await axios.delete(`http://localhost:3000/patient/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      getPatients();
      showToast(response.data.message, 'success');
    } catch (error) {
      showToast(error.response.data.message, 'error');
      console.error('Error deleting patient:', error);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className=" mx-auto p-4 sm:ml-64 mt-16 background_patient" >
       <div className="flex justify-between mb-4 my-10">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button className='ms-2 p-1 text-center bg-transparent border-2 border-blue-500 hover:bg-blue-700 text-blue-500 hover:text-white font-bold  rounded'>
          <NavLink to="/creatPatients">Create </NavLink>
        </button>
      </div>
      <div className="overflow-x-auto">
      <table className=" min-w-full bg-transparent border border-gray-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">View Prescription</th>
            <th className="py-2 px-4 border-b">add Prescription</th>

            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((patient, index) => (
              <tr key={index} className='text-center'>
                <td className="py-2 px-4 border-b">{index+1}</td>
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b">{patient.age}</td>
                <td className="py-2 px-4 border-b">{patient.gender}</td>
                <td className="py-2 px-4 border-b">{patient.phone}</td>
                <td className="py-2 px-4 border-b">{patient.address}</td>
                <td className="py-2 px-4 border-b">{patient.date.slice(0, 10)}</td>
                <td className="py-2 px-4 border-b"> 
                  <button
                    className="bg-transparent border-2 border-cyan-400 hover:bg-cyan-400 text-cyan-400 hover:text-white font-bold py-2 px-4 rounded ms-1"
                  >
                    <NavLink to={`/prescription/${patient._id}`}>View</NavLink>
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-transparent border-2 border-green-400 hover:bg-green-400 text-green-400 hover:text-white font-bold py-2 px-4 rounded ms-1"
                  >
                    <NavLink to={`/addPrescription/${patient._id}`}>Add</NavLink>
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-zinc-400 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded ms-1"
                  >
                    <NavLink to={`/updatePatients/${patient._id}`}><FaRegEdit /></NavLink>
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-1 "
                  >
                 <MdDelete />
                   </button> 
                </td>
             

                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-2 px-4 border-b text-center">
                No patients found
              </td>
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
                className={`flex items-center justify-center px-4 h-10 leading-tight ${page === index + 1 ? 'text-green-600 border border-green-300 bg-green-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
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
  );
}

export default Patients;
