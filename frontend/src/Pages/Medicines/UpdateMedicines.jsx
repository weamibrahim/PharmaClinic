import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "./../../Context/ToastContext";
function UpdateMedicines() {
  const { showToast } = useToast();
  const [medicine, setMedicines] = useState({
    name: '',
    dosage: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    // Fetch the current medicine data
    const getMedicineDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/medicine/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMedicines(response.data); // Populate the form with fetched data
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    getMedicineDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicines({
      ...medicine,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
    const response =  await axios.put(`http://localhost:3000/medicine/${id}`, medicine, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false);

      showToast(response.data.message, 'success');
      // Redirect to AllMedicines page
      navigate('/allMedicines');
    } catch (error) {
      showToast(error.response.data.message, 'error');
      console.error('Error updating medicine:', error);
      setError('Failed to update medicine');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 my-10">
      <h2 className="text-2xl font-bold mb-4 my-10">Update Medicine</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Medicine Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={medicine.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dosage" className="block text-gray-700 font-bold mb-2">
            Dosage
          </label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={medicine.dosage}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={medicine.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update Medicine'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/allMedicines')}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateMedicines;
