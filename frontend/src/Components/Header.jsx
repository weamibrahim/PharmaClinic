import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useLogin } from "../Context/IsLoginContext";
import { useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
const navigation = [
  { name: 'login', href: '/login', current: false },
  { name: 'register', href: '/register', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { IsLogin } = useLogin();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData ? userData.role : null;

  useEffect(() => {

  }, [IsLogin]);
  return (
    <Disclosure as="nav" className="bg-gray-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group bg-gray-200 relative inline-flex items-center justify-center rounded-md p-2 border-2 text-gray-800  hover:text-gray-800  focus:ring-2 focus:ring-inset focus:ring-gray-200">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center md:justify-between justify-center   ">
            <div className="">
              <NavLink to="/">
               
                <span className=" md:text-2xl font-semibold text-2xl whitespace-nowrap dark:text-white">
                  PharmaClinic
                </span>
              </NavLink>
            </div>
            
          </div>
          {/* Right-aligned Login and Register links */}
          {IsLogin ?
            (
              userRole === "admin" ? (
                <div className="hidden sm:flex sm:ml-6">
                  <MdDashboard className='text-2xl' />
                  <NavLink
                    to="/users"
                    className="text-black text-xl ms-2"
                  >
                    Dashboard
                  </NavLink>

                </div>
              ) : userRole === "doctor" ? (
                <div className="hidden sm:flex sm:ml-6">
                  <MdDashboard className='text-2xl' />
                  <NavLink
                    to="/patients"
                    className="text-black text-xl ms-2"
                  >
                    Dashboard
                  </NavLink>

                </div>
              ) : userRole === "pharmacist" ? (<div className="hidden sm:flex sm:ml-6 items-center">
                <MdDashboard className='text-2xl' />
                <NavLink
                  to="/allMedicines"
                  className="text-black text-xl ms-2"
                >
                  Dashboard
                </NavLink>


              </div>) : null

            ) : (<div className="hidden sm:flex sm:ml-6">

              <NavLink
                to="/login"

                className={classNames(
                  'text-black hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-lg font-medium',
                )}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={classNames(
                  'text-black hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-lg font-medium',
                )}
              >
                Register
              </NavLink>
            </div>)}

        </div>
      </div>

      <DisclosurePanel className="sm:hidden">

        {IsLogin ? (


          userRole === "admin" ? (
            <DisclosureButton className="w-full px-3 py-4">
               <div className=' flex items-center space-y-1  justify-center  rounded-md px-3 py-2 text-base font-medium bg-gray-200 '>
              <MdDashboard className='text-xl' />
              <NavLink
                to="/users"
                className="text-black text-xl ms-2"
              >
                Dashboard
              </NavLink>
              </div>
            </DisclosureButton>
          ) : userRole === "doctor" ? (

            <DisclosureButton className="w-full px-3 py-4">
             <div className=' flex items-center space-y-1  justify-center  rounded-md px-3 py-2 text-base font-medium bg-gray-200 '>
             <MdDashboard className='text-2xl' />
              <NavLink
                to="/patients"
                className="text-black text-xl ms-2"
              >
                Dashboard
              </NavLink>
             </div>

            </DisclosureButton>
          ) : userRole === "pharmacist" ? (
            <DisclosureButton className="w-full px-3 py-4">
 <div className=' flex items-center space-y-1  justify-center  rounded-md px-3 py-2 text-base font-medium bg-gray-200 '>
              <MdDashboard className='text-2xl' />
              <NavLink
                to="/allMedicines"
                className="text-black text-xl ms-2"
              >
                Dashboard
              </NavLink>

</div>

            </DisclosureButton>) : null




        ) : (<div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white ' : 'text-dark-300 bg-gray-200 text-center',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>)}
      </DisclosurePanel>
    </Disclosure>
  );
}
