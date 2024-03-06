import React from 'react';
import { XOctagonFill } from 'react-bootstrap-icons';




const Failure = () => {
  
  return (
   
    <div className="container">
     
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-6 text-center">
          <XOctagonFill style={{ fontSize: '5rem', color: 'red' }} />
          <h2 className="mt-3">payment failed</h2>
        </div>
      </div>
      
    </div>
  );
}

export default Failure;