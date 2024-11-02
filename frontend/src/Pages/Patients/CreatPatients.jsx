import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./../../Context/ToastContext";
function CreatPatients() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [dataOfPatient, setDataOfPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataOfPatient({
      ...dataOfPatient,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:3000/patient",
        dataOfPatient,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response data:", response.data);

      if (response.data) {
        showToast(response.data.message, "success");

        navigate("/patients");
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className=" mx-auto p-4 sm:ml-64 mt-16 background_patient">
      <form onSubmit={handleSubmit} className="my-9">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="text"
              name="name"
              value={dataOfPatient.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="number"
              min={0}
              max={20}
              name="age"
              value={dataOfPatient.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              name="gender"
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
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="text"
              name="phone"
              value={dataOfPatient.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="text"
              name="address"
              value={dataOfPatient.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              className="block w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="date"
              name="date"
              value={dataOfPatient.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatPatients;
