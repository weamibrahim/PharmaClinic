import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function AllPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getPrescriptions();
  }, [page]);

  const getPrescriptions = async () => {
    try {
      const response = await axios.get(`https://pharmaclinic-production.up.railway.app/prescription?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      setPrescriptions(response.data.prescriptions);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

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
      <h1 className="text-2xl font-bold mb-4">All Prescriptions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/20 border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Patient name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Prescription</th>
              <th className="py-2 px-4 border-b">view</th>
              <th className="py-2 px-4 border-b">IsRead </th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (

              prescriptions.filter((prescription) =>
                prescription.patientId.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((prescription, index) => (

                <tr key={index} className={`text-center ${prescription.IsRead ? 'font-normal' : 'font-bold'}`}>

                  <td className="py-2 px-4 border-b">{prescription.patientId.name}</td>
                  <td className="py-2 px-4 border-b">{prescription.patientId.phone}</td>
                  <td className="py-2 px-4 border-b">{new Date(prescription.Date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{prescription.prescription}</td>
                  <td className="py-2 px-4 border-b ">
                    <button className="bg-transparent border-2 border-cyan-400 hover:bg-cyan-400 text-cyan-400 hover:text-white font-bold py-2 px-4 rounded">

                      <NavLink to={`/viewPrescription/${prescription._id}`}>View</NavLink>
                    </button></td>

                  <td className="py-2 px-4 border-b">
                    {prescription.IsRead ? 'Read' : 'Unread'}
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
  );
}

export default AllPrescription;
