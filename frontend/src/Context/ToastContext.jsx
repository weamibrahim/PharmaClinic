import { react,createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ToastContext = createContext();


export const ToastProvider = ({ children }) => {
    const toastOptions = {
        position: "top-right",
        autoClose: 2000,
        
    };
   const showToast = (message, type) => {
       switch (type) {
           case "success":
               toast.success(message, toastOptions);
               break;
           case "error":
               toast.error(message, toastOptions);
               break;
           case "warning":
               toast.warning(message, toastOptions);
               break;
           case "info":
               toast.info(message, toastOptions);
               break;
           default:
               break;
       }
   }
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext)
