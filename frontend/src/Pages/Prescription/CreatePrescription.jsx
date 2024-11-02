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

  const [page, setPage] = useState(1);
  const prescriptionInputRef = useRef();

  const [prescription, setPrescription] = useState({
    prescription: '',
    Date: '',
  });

  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getMedicines();
  }, [page]);

  const getMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/medicine/name?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMedicines(response.data.medicines);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log(error.response || error.message);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
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
    <div className="mx-auto p-4 sm:ml-64 mt-16 background_patient">
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
              className='focus:ring-green-400 focus:border-green-400 rounded-md'
            />
            <label htmlFor="Date">Date:</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={prescription.Date}
              onChange={handleChange}
              className='focus:ring-green-400 focus:border-green-400 rounded-md'
            />
            <div className="flex justify-center my-6">
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

                <h2 className="text-lg font-bold text-center my-7">Selected Medicines</h2>
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
                  className="border border-gray-300 rounded-md px-2 py-1 my-4"
                />
                <h2 className="text-lg   font-bold">Available Medicines</h2>
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
                <nav aria-label="Page navigation example" className="flex justify-center mt-4">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                      >

                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                      </button>
                    </li>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setPage(index + 1)}
                          className={`flex items-center justify-center px-4 h-10 leading-tight ${page === index + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li>
                      <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                      >

                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>

              </div>


            </div>


          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default CreatePrescription;
