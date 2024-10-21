import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from "./../../Context/ToastContext";
function UpdatePatients() {
  const { showToast } = useToast();
  const { id } = useParams()  
  const navigate = useNavigate()

  const [dataOfPatient, setDataOfPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    Date: '',
  })

  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setDataOfPatient(response.data)
      } catch (error) {
        console.error('Error fetching patient data', error)
        
      }
    }

    fetchPatientData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataOfPatient({
      ...dataOfPatient,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    const response =  await axios.put(`http://localhost:3000/patient/${id}`, dataOfPatient, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('Patient updated successfully')
      showToast(response.data.message, 'success')
      navigate('/patients')  // Redirect to the patients list
    } catch (error) {
      console.error('Error updating patient data', error)
      showToast(error.response.data.message, 'error')
    }
  }

  return (
    <div className="mx-auto p-4 sm:ml-64 my-20">
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className='block w-full'
              type="text"
              name='name'
              value={dataOfPatient.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              className='block w-full'
              type="number"
              min={0}
              max={20}
              name='age'
              value={dataOfPatient.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              className='block w-full'
              name='gender'
              value={dataOfPatient.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className='block w-full'
              type="text"
              name='phone'
              value={dataOfPatient.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              className='block w-full'
              type="text"
              name='address'
              value={dataOfPatient.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              className='block w-full'
              
              type="date"
              name='Date'
              value={dataOfPatient.Date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10'
            type='submit'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePatients
