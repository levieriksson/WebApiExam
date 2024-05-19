// src/utils/NotificationManager.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000, // Auto close after 5 seconds
    className: 'toast-warning', // Custom class name
    style: { 
      backgroundColor: 'red', 
      color: 'white' 
    }
  });
};

export default notify;
