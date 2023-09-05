import React from 'react';
import loader from "../../config/giphy.gif";

const Spinner = () => {
  return (
    <div className='loader-container'>
        <img src={ loader } alt="spinner" />
    </div>
  )
}

export default Spinner