import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./layout/layout";
import Patients from "./Pages/Patients/Patients";
import CreatPatients from "./Pages/Patients/CreatPatients";
import UpdatePatients from "./Pages/Patients/UpdatePatients";
import PrescriptionByPatient from "./Pages/Prescription/PrescriptionByPatient";
import CreatePrescription from "./Pages/Prescription/CreatePrescription";
import UpdatePrescription from "./Pages/Prescription/UpdatePrescription";
import ViewPrescription from "./Pages/Prescription/ViewPrescription";
import AllPrescription from "./Pages/Prescription/AllPrescription";
import AllMedicines from "./Pages/Medicines/AllMedicines";
import CreateMedicines from "./Pages/Medicines/CreateMedicines";
import UpdateMedicines from "./Pages/Medicines/UpdateMedicines";
import UpdateProfile from "./Pages/UpdateProfile";
import AllUser from "./Pages/Users/AllUser";
import Chat from "./Components/Chat";
import { useLogin } from "./Context/IsLoginContext";
import Header from "./Components/Header";
import { ToastContainer } from 'react-toastify';
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";


function App() {


  const { IsLogin } = useLogin();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = IsLogin// Check if userData is not null
  const userRole = userData ? userData.role : null;

  useEffect(() => {
    console.log('Is Logged In:', isLoggedIn);
  }, [IsLogin]);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>


          {/* Routes for doctor */}
          {userRole === "doctor" ? (
            <>
          
              <Route path="/patients" element={isLoggedIn ? <Patients /> : <Navigate to="/login" />} />
              <Route path="/creatPatients" element={isLoggedIn ? <CreatPatients /> : <Navigate to="/login" />} />
              <Route path="/updatePatients/:id" element={isLoggedIn ? <UpdatePatients /> : <Navigate to="/login" />} />
              <Route path="/addPrescription/:patientId" element={isLoggedIn ? <CreatePrescription /> : <Navigate to="/login" />} />
              <Route path="/updatePrescription/:patientId/:id" element={isLoggedIn ? <UpdatePrescription /> : <Navigate to="/login" />} />
              <Route path="/viewPrescription/:id" element={isLoggedIn ? <ViewPrescription /> : <Navigate to="/login" />} />
              <Route path="/prescription/:patientId" element={isLoggedIn ? <PrescriptionByPatient /> : <Navigate to="/login" />} />
              <Route path="/allPrescription" element={isLoggedIn ? <AllPrescription /> : <Navigate to="/login" />} />
              <Route path="/updateProfile" element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/login" />} />
            </>
          ) : userRole === "pharmacist" ? (  // Routes for pharmacist
            <>
              
              <Route path="/allPrescription" element={isLoggedIn ? <AllPrescription /> : <Navigate to="/login" />} />
              <Route path="/allMedicines" element={isLoggedIn ? <AllMedicines /> : <Navigate to="/login" />} />
              <Route path="/createMedicines" element={isLoggedIn ? <CreateMedicines /> : <Navigate to="/login" />} />
              <Route path="/updateMedicines/:id" element={isLoggedIn ? <UpdateMedicines /> : <Navigate to="/login" />} />
              <Route path="/viewPrescription/:id" element={isLoggedIn ? <ViewPrescription /> : <Navigate to="/login" />} />
              <Route path="/updateProfile" element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/login" />} />
            </>
          ) : userRole === "admin" ? (
            <>
              
              <Route path="/users" element={isLoggedIn ? <AllUser /> : <Navigate to="/login" />} />
              <Route path="/updateProfile" element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/login" />} />


            </>) : null}

        </Route>
       
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<><Header /><Login /></>} />
        <Route path="/register" element={<><Header /><Register /></>} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path ="*" element ={<NotFound/>}/>
        
    
      </Routes>

    </BrowserRouter>
  );
}

export default App;
