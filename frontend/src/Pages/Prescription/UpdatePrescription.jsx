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
        const response = await axios.get(`https://pharmaclinic-production.up.railway.app/prescription/view/${id}`, {
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
      const response = await axios.put(`https://pharmaclinic-production.up.railway.app/prescription/${id}`, {
        ...prescription,
        Date: prescription.Date
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
    <div className="mx-auto p-4 sm:ml-64 mt-16 bg-emerald-400 background_patient">
      <form onSubmit={handleSubmit} className='flex flex-col mx-auto  max-w-96 my-20 bg-white/20 p-10'>
        <label htmlFor="prescription"

          className='my-4'>Prescription:</label>
        <input

          type="text"
          id="prescription"
          name="prescription"
          className='focus:ring-green-400 focus:border-green-400 rounded-md'
          value={prescription.prescription}
          onChange={handleChange}

        />
        <label htmlFor="date"
          className='my-4'>Date:</label>
        <input
          type="date"
          className='focus:ring-green-400 focus:border-green-400 rounded-md'
          name="Date"
          value={prescription.Date}
          onChange={handleChange}

        />

        <div className='flex justify-center my-8'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePrescription;
