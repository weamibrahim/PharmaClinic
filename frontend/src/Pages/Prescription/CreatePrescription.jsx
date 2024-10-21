import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from "./../../Context/ToastContext";
function CreatePrescription() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { patientId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const prescriptionInputRef = useRef(); // Create a ref for the prescription input

  const [prescription, setPrescription] = useState({
    prescription: '',
    Date: '',
  });

  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/medicine/name`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMedicines(response.data);
    } catch (error) {
      console.log(error.response || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   axios.post(`http://localhost:3000/prescription/${patientId}`, prescription, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log(response);
        navigate('/prescription/' + patientId);
        showToast(response.data.message, 'success');
      })
      .catch((error) => {
        console.log(error);
        showToast(error.response.data.message, 'error');
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Check if the dragged item is from medicines or selectedMedicines
    if (result.source.droppableId === 'medicines' && result.destination.droppableId === 'selectedMedicines') {
      // Handle dragging from medicines to selectedMedicines
      const draggedMedicine = medicines[sourceIndex];
      if (!selectedMedicines.some(m => m._id === draggedMedicine._id)) {
        setSelectedMedicines((prev) => [...prev, draggedMedicine]);

        // Update the prescription input with the selected medicine's name
        const updatedPrescription = `${prescription.prescription} ${draggedMedicine.name} ${draggedMedicine.dosage}`.trim();
        setPrescription((prev) => ({
          ...prev,
          prescription: updatedPrescription,
        }));

        prescriptionInputRef.current.value = updatedPrescription; // Update the input field directly
            // Update the medicines list to remove the dragged medicine
            setMedicines((prev) => prev.filter(m => m._id !== draggedMedicine._id));
      }
    } else if (result.source.droppableId === 'selectedMedicines' && result.destination.droppableId === 'selectedMedicines') {
      // Handle reordering in selectedMedicines
      const reorderedMedicines = Array.from(selectedMedicines);
      const [removed] = reorderedMedicines.splice(sourceIndex, 1);
      reorderedMedicines.splice(destinationIndex, 0, removed);
      setSelectedMedicines(reorderedMedicines);
    }
  };

  const handleRemoveMedicine = (medicine) => {
    setSelectedMedicines((prev) => prev.filter((m) => m._id !== medicine._id));
    

    const updatedPrescription = prescription.prescription.split(' ').filter((name) => name !== medicine.name).join(' ');

    prescriptionInputRef.current.value = updatedPrescription;

    setPrescription((prev) => ({
      ...prev,
      prescription: updatedPrescription,
    }));
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 my-10">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col my-20">
            <label htmlFor="prescription">Prescription:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedMedicines.map((medicine) => (
                <div key={medicine._id} className="flex items-center border border-gray-300 rounded-md p-2">
                  <p>{medicine.name}-{medicine.dosage}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(medicine)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times; {/* Close button */}
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              id="prescription"
              name="prescription"
              ref={prescriptionInputRef} // Attach the ref to the input
              value={prescription.prescription}
              onChange={handleChange}
              placeholder="Add medicines here"
              className="border border-gray-300 rounded-md p-2"
            />
            <label htmlFor="Date">Date:</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={prescription.Date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="my-20">
         
         
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-2 gap-2'>
            <div>
          
          <h2 className="text-lg font-bold my-7">Selected Medicines</h2>
          <Droppable droppableId="selectedMedicines">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {selectedMedicines.map((medicine, index) => (
                  <Draggable key={medicine._id} draggableId={medicine._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-300 p-4 my-2 flex justify-between items-center"
                      >
                        <p>{medicine.name}-{medicine.dosage}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(medicine)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times; {/* Close button */}
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div >
              <div>
              <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
              <h2 className="text-lg font-bold">Available Medicines</h2>
            <Droppable droppableId="medicines">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {medicines.filter((med) => med.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
                    .map((medicine, index) => (
                      <Draggable key={medicine._id} draggableId={medicine._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border border-gray-300 p-4 my-2"
                          >
                            <p>{medicine.name}-{medicine.dosage}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
           
            </div>
          
           
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default CreatePrescription;
