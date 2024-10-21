import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useLogin } from "../Context/IsLoginContext";
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
     
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <NavLink to="/" className="flex ms-2 md:me-24">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-baby-logo_23-2148013976.jpg?t=st=1728926916~exp=1728930516~hmac=841ca1c28443c274b1c12172e09a48afd622611df20d22a49ea0938099b40a0d&w=740"
                  className="w-12 h-12 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  PharmaClinic
                </span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="me-2">
                  <NavLink to="/login">Login</NavLink>
                </div>
                <div className="me-2">
                  <NavLink to="/register">Register</NavLink>
                </div>
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {user.role === "doctor" && (
              <li>
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IoPeopleOutline className="text-2xl" />
                  <span className="ms-3">
                    <NavLink to="/patients">Patients</NavLink>
                  </span>
                </div>
              </li>
            )}
            {user.role === "pharmacist" && (
              <>
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <IoPeopleOutline className="text-2xl" />
                    <span className="ms-3">
                      <NavLink to="/allMedicines">medicines</NavLink>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <IoPeopleOutline className="text-2xl" />
                    <span className="ms-3">
                      <NavLink to="/allPrescription">Prescription</NavLink>
                    </span>
                  </div>
                </li>
              </>
            )}

            {/* <li>
         <NavLink to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
             <path d="M4 1a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm1 2h10v13H5V3Zm6 4H9v2h2V7Zm-2 4h2v2H9v-2Z" />
           </svg>
           <span className="ms-3">Projects</span>
         </NavLink>
       </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
