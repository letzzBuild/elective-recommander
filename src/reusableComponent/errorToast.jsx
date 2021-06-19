import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Errortoast(msg) {
    

    return (toast.error(msg),{
        position:"top-right",
        autoClose:50000
    });
    
}