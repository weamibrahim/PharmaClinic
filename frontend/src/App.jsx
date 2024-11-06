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

          {IsLogin &&
          userRole === "doctor" ? (
            <>
          
              <Route path="/patients" element={ <Patients /> } />
              <Route path="/creatPatients" element={ <CreatPatients /> } />
              <Route path="/updatePatients/:id" element={ <UpdatePatients /> } />
              <Route path="/addPrescription/:patientId" element={ <CreatePrescription /> } />
              <Route path="/updatePrescription/:patientId/:id" element={ <UpdatePrescription /> } />
              <Route path="/viewPrescription/:id" element={ <ViewPrescription /> } />
              <Route path="/prescription/:patientId" element={ <PrescriptionByPatient /> } />
              <Route path="/allPrescription" element={ <AllPrescription /> } />
              <Route path="/updateProfile" element={ <UpdateProfile /> } />
            </>
          ) : userRole === "pharmacist" ? (  // Routes for pharmacist
            <>
              
              <Route path="/allPrescription" element={ <AllPrescription /> } />
              <Route path="/allMedicines" element={ <AllMedicines /> } />
              <Route path="/createMedicines" element={ <CreateMedicines /> } />
              <Route path="/updateMedicines/:id" element={ <UpdateMedicines /> } />
              <Route path="/viewPrescription/:id" element={ <ViewPrescription /> } />
              <Route path="/updateProfile" element={ <UpdateProfile /> } />
            </>
          ) : userRole === "admin" ? (
            <>
              
              <Route path="/users" element={ <AllUser /> } />
              <Route path="/updateProfile" element={ <UpdateProfile /> } />


            </>) : null }

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
