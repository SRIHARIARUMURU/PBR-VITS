import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import Success from './Success';
import Failure from './Failure';


function App() {
  
  

  return (
   
      <BrowserRouter>
        <Routes>
          
         
            <>
              <Route
                path="/success"
                element={<Success />}
              />
              <Route path="/failure" element={<Failure />} />
           
             
              <Route
                path="/"
                element={<PaymentForm />}
              />
            </>
            
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;