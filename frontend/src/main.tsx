
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css'
import {LoginProvider } from "./Context/IsLoginContext";

import { ToastProvider } from "./Context/ToastContext";
createRoot(document.getElementById('root')!).render(
    <LoginProvider >
    <ToastProvider>
    <App />
    </ToastProvider>
    </LoginProvider>
)
