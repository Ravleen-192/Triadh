import React from 'react';
import '../App.css'

export const FormErrors = ({ formErrors }) =>
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        console.log("FormErrors");
        return (
             <>
          <p  key={i}>{fieldName}: {formErrors[fieldName]}</p>
          <hr /></> 
         
        )
      } else {
        return '';
      }
    })}
  </div>
