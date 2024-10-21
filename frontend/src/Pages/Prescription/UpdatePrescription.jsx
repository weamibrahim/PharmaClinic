import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "./../../Context/ToastContext";
function UpdatePrescription() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id, patientId } = useParams();
  const [prescription, setPrescription] = useState({
    prescription: '',
    Date: ''
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/prescription/view/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPrescription(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const response =   await axios.put(`http://localhost:3000/prescription/${id}`, {
        ...prescription,
        Date: prescription.Date // Ensure Date is correctly formatted, if necessary
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate(`/prescription/${patientId}`);
      showToast(response.data.message, 'success');
    } catch (error) {
      console.error(error);
      showToast(error.response.data.message, 'error');
    }
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 my-10">
      <form onSubmit={handleSubmit} className='flex flex-col my-20'>
        <label htmlFor="prescription">Prescription:</label>
        <input
          type="text"
          id="prescription"
          name="prescription"
          value={prescription.prescription}
          onChange={handleChange}
         
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          
          name="Date"
          value={prescription.Date}
          onChange={handleChange}
          
        />
        
        <div className='flex justify-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePrescription;
