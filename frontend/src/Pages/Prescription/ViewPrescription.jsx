import React, { useRef, useState, useEffect ,Component} from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import "../../App.css"

class ComponentToPrint extends Component {
  render() {
    const { prescription, innerRef } = this.props;
    return (
      <div ref={innerRef} >
      <h2 className="text-2xl font-bold text-center my-4">Prescription</h2>
     <div className="grid grid-cols-2 gap-4 justify-between p-5">
        <p><strong>Patient Name:</strong> {prescription.userId.name}</p>
        <p><strong>Patient Specialization:</strong> {prescription.userId.specialization}</p>
        <p><strong>Patient Phone:</strong> {prescription.userId.phone}</p>
        <p><strong>Patient Address:</strong> {prescription.userId.address}</p>
      
      </div>

      
      <div className="grid grid-cols-2 gap-4 justify-between p-5">
        <p><strong>Patient Name:</strong> {prescription.patientId.name}</p>
        <p><strong>Patient Age:</strong> {prescription.patientId.age}</p>
        <p><strong>Patient Phone:</strong> {prescription.patientId.phone}</p>
        <p><strong>Patient Address:</strong> {prescription.patientId.address}</p>
        <p><strong>Date:</strong> {new Date(prescription.Date).toLocaleDateString()}</p>
      </div>
      
      <div className="text-center block min-h-40 mt-4">
        <strong className="block">Prescription:</strong> {prescription.prescription}
      </div>
    </div>
    
    )
  }
}
const ViewPrescription = () => {
  const [prescription, setPrescription] = useState(null);
  const { id } = useParams();
  const contentRef = useRef(null);

  useEffect(() => {
    
    getPrescriptionDetails();
  }, [id]);

  const getPrescriptionDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/prescription/view/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPrescription(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching prescription:', error);
    }
  };
  const handlePrint = useReactToPrint({ contentRef });

  if (!prescription) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <div className="mx-auto p-4 sm:ml-64 my-20 " >
       
       
        <ComponentToPrint innerRef={contentRef}  prescription={prescription} />
        <div className="flex justify-center ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-center rounded "
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      </div>
   
    </>
  );
};

export default ViewPrescription;