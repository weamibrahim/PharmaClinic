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
    price: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    // Fetch the current medicine data
    const getMedicineDetails = async () => {
      try {
        const response = await axios.get(`https://pharmaclinic-production.up.railway.app/medicine/${id}`, {
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


    try {
      const response = await axios.put(`https://pharmaclinic-production.up.railway.app/medicine/${id}`, medicine, {
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

      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 my-10 background_pharamcy">
      <h2 className="text-2xl font-bold mb-4 my-10">Update Medicine</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white/20 p-10 rounded-md">
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
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={medicine.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={` bg-white border border-green-400 hover:text-white text-green-400 hover:bg-green-500  font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Updating...' : 'Update '}
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
