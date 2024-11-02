import React from 'react';
import imageHome from '../../public/home.jpg';
import doctor from '../assets/doctor.jpg';
import pharmacy from '../assets/pharmcy.jpg';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
function Home() {
  return (
    <>
    <div className="relative">
      <img src={imageHome} className="w-full h-full" alt="home" />
      <div className="absolute inset-0 flex  justify-center ">
        <div className=' md:ms-24 md:text-6xl md:font-bold text-white  pt-200 md:pt-24 flex flex-col items-center'>
          <span className='md:mb-4'>Doctors</span>
          <span className='md:my-4'> &</span>
          <span className='md:mb-4'>Pharmacy</span>
        </div>
      </div>
    </div>
    <div>
    <div className='text-center my-14'>
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg bg-gray-100 p-4 w-1/2 mx-auto rounded-full"> 
            We are a team of doctors and pharmacists dedicated to providing high-quality healthcare services to our patients.</p>
       
        </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-9'>
        
      <motion.div
            className="col-md-6  "
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 2 }}
          >
         <div className='text-center'>
          <h1 className="text-4xl font-bold mb-4">Doctors</h1>
          <p className="text-lg pt-14 w-3/4 mx-auto">
           when patients need medical care, our doctors are always ready to provide the best possible care.
           doctors are trained to diagnose and treat patients with the best possible care.
           doctors have patients who are in need of specialized care after create prescriptions for them ,send them to pharmacies to get the medications they need.
            
          </p>
        </div>
        </motion.div> 
        <motion.div
            className="col-md-6 "
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay:2 }}
          >
      <img src={doctor}
      className='w-full h-4/5 rounded-full'
      
      />
      </motion.div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-9'>
      <motion.div
            className="col-md-6  "
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 3 }}
          >
      <img src={pharmacy}
      className='w-full h-4/5 rounded-full'
      
      />
      </motion.div>
       
         <motion.div
            className="col-md-6 "
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 3 }}
          >
         <div className='text-center pb-5'>
          <h1 className="text-4xl font-bold mb-4">Pharmacy</h1>
          <p className="text-lg md:pt-44 w-3/4 mx-auto">
          we have pharmacies that are available 24/7 to provide our patients with the best possible health care.
          after doctors have patients who are in need of specialized care after create therapies treatments for them ,send them to pharmacies to get the medications they need.
          </p>
        </div> 
     </motion.div>
      </div>
 
    </div>
    <Footer/>
    </>
  );
}

export default Home;
