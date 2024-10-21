import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useToast } from "./../../Context/ToastContext";
function PrescriptionByPatient() {
  const { showToast } = useToast();
    const [prescription, setPrescription] = useState([]);
    const { patientId } = useParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); 
    console.log('Patient ID:', patientId);

    useEffect(() => {
        
        getPrescription();
    }, [patientId, page]);

    const getPrescription = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/prescription/${patientId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPrescription(response.data.prescriptions);
            setTotalPages(response.data.totalPages); 
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
         const response =   await axios.delete(`http://localhost:3000/prescription/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            getPrescription();
            showToast(response.data.message, 'success');

        } catch (error) {
            showToast(error.response.data.message, 'error');
            console.log(error);
        }
    };
    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
      };
    
      const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
      };

    return (
        <div className="mx-auto p-4 sm:ml-64 my-20">

                            <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Prescription</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">View</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
    {prescription.length > 0 ? (
        prescription.map((item) => (
            <tr key={item._id}>
                <td className="border border-gray-300 p-2">{item.prescription}</td>
                <td className="border border-gray-300 p-2">{new Date(item.Date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                    <NavLink to={`/viewPrescription/${item._id}`}>
                        <button className="bg-white border border-cyan-400 hover:bg-cyan-400 text-cyan-400 hover:text-white  font-bold py-2 px-4 rounded">View</button>
                    </NavLink>
                </td>
                <td className="border border-gray-300 p-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-1">
                        <NavLink to={`/updatePrescription/${patientId}/${item._id}`}><FaRegEdit /></NavLink>
                    </button>
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-1"
                    >
                        <MdDelete />
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={4} className="py-2 px-4 text-center">No prescriptions found</td>
        </tr>
    )}
</tbody>

                </table>

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
    );
}

export default PrescriptionByPatient;
