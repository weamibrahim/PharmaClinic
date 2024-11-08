import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useLogin } from "../Context/IsLoginContext";
import {faCapsules} from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "./NotificationaddPrescription";
import NotificationAddMedicine from "./NotificationaddMedicine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilePrescription} from "@fortawesome/free-solid-svg-icons";
import {faHospitalUser} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const { setIsLogin } = useLogin();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => {
    console.log("isMenuOpen", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLogin(false);
    window.location.href = "/login";
  };
  return (
    <>
     
      <nav className="fixed top-0 z-50 w-full bg-green-100 border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg bg-gray-100 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <NavLink to="/" className="flex md:ms-2 ms-9 md:me-24">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-baby-logo_23-2148013976.jpg?t=st=1728926916~exp=1728930516~hmac=841ca1c28443c274b1c12172e09a48afd622611df20d22a49ea0938099b40a0d&w=740"
                  className="w-12 h-12 me-3 rounded-full hidden md:block"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  PharmaClinic
                </span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
             {
              user.role === "pharmacist" && (
                <div className="mx-3"><NotificationBell/></div>)
             }
             {user.role==="doctor" && (
               <div className="mx-3"><NotificationAddMedicine/></div>
              )}
                <div>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${user.photo}`}
                      alt="user photo"
                    />
                    
                  </button>
                 
                </div>
               
                {isMenuOpen && (
                  <div
                    className="absolute  right-0 top-12 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <NavLink
                          to="/updateProfile"
                          className="inline-flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <IoIosSettings className="my-1 me-2" />
                          Settings
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          className="inline-flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <CiLogout className="my-1 me-2" />
                          <span onClick={handleLogout}>Sign out</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
  id="logo-sidebar"
  className={`fixed top-0 left-0 z-40 w-52 pt-20 transition-transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } bg-green-100 border-r-2 h-screen sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
  aria-label="Sidebar"
>
  <div className="px-3 pb-4 h-full overflow-y-auto bg-green-100 dark:bg-gray-800 flex flex-col justify-between">
    <ul className="space-y-2 font-medium my-8">
      {user.role === "doctor" && (
        <li>
          <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faHospitalUser} className="text-2xl" />
            <span className="ms-3">
              <NavLink to="/patients">Patients</NavLink>
            </span>
          </div>
        </li>
      )}
      {user.role === "admin" && (
        <li>
          <div className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-200 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
            <IoPeopleOutline className="text-2xl" />
            <span className="ms-3">
              <NavLink to="/users">Users</NavLink>
            </span>
          </div>
        </li>
      )}
      {user.role === "pharmacist" && (
        <>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-200 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
              <FontAwesomeIcon icon={faCapsules} className="text-2xl" />
              <span className="ms-3">
                <NavLink to="/allMedicines">Medicines</NavLink>
              </span>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-200 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
              <FontAwesomeIcon icon={faFilePrescription} className="text-2xl" />
              <span className="ms-3">
                <NavLink to="/allPrescription">Prescription</NavLink>
              </span>
            </div>
          </li>
        </>
      )}
    </ul>
    
    {/* Logout Button at the Bottom */}
    <div className="mb-24">
      <button
        onClick={handleLogout}
        className="flex items-center w-full p-2 text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 group"
      >
        <CiLogout className="text-2xl font-medium" />
        <span className="ms-3 text-black font-medium dark:text-white">Logout</span>
      </button>
    </div>
  </div>
</aside>

    </>
  );
}

export default Sidebar;
