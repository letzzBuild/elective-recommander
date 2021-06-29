import Loader from "react-loader-spinner";
import React from 'react';
import "../Pages/style.css"
export default function LoaderComp() {
  //other logic
  
    return (
      <div class="loaderdiv">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
   </div>
    );
  
}