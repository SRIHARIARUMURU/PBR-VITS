import React, { useState } from 'react';
import { Form, Button, FormGroup, Card, CardHeader, CardFooter, Modal } from 'react-bootstrap';
import Success from './Success';

import axios from 'axios';
import { Link } from 'react-router-dom';

import './App.css';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  
  const [amount, setAmount] = useState(10036);
  const [rollNumber, setRollNumber] = useState('');
 const [name,setname]=useState()
  
  const [Data, setData] = useState({});
  const base_url="http://localhost:3001"
  
const [category,setCategory]=useState();
 
  const rollHandler = (e) => {
    setRollNumber(e.target.value);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('amount', amount);
    localStorage.setItem('category', category);
    localStorage.setItem("name",name)
    localStorage.setItem("roll",rollNumber)
    try {
    
        if (amount <= 0) {
          alert('Amount must be greater than 0');
        } else {
          setLoading(true);
         
            const response = await axios.post(`${base_url}/initiatePayment`, {
              amount,
              rollNumber,
            });

            if (response.data.redirectUrl) {
              window.location.href = response.data.redirectUrl;
            } else {
              console.error('Error initiating payment:', response.data.error);
              alert('Error initiating payment. Please try again.');
            }
          
        }
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (rollNumber === Data.rollNumber) {
      setShow(true);
    }
  };
  const remainingFeeClick=()=>{
    setAmount(Data.totalFee-Data.paidFee)
    handleClose();
  }
  const totalFeeClick=()=>{
    setAmount(Data.totalFee)
    handleClose();
  }
  const installmenClick=()=>{
    setAmount(Data.totalFee/4)
    handleClose();
  }
  const nameHandler=(e)=>{
    setname(e.target.value)
   

  }

  return (
    <>
    
    <div style={{ marginTop: '100px' }} className="mx-3" >
    
        <Card id="subm" style={{ marginBottom: "60px" }}>
          <CardHeader id='heading1'>Payment Form</CardHeader><br/>
          <Form onSubmit={handleSubmit} id="back">
          <Form.Group controlId="formRollNumber">
              <Form.Label id="label">name <span className='text-danger'>★</span></Form.Label>
              <Form.Control type="text" value={name} onChange={nameHandler} required placeholder='enter your name' id="control" />
            </Form.Group>
            <Form.Group controlId="formRollNumber">
              <Form.Label id="label">Roll Number <span className='text-danger'>★</span></Form.Label>
              <Form.Control type="text" value={rollNumber} onChange={rollHandler} required placeholder='enter your roll number' id="control" />
            </Form.Group>

            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label id="label">Select an option <span className='text-danger'>★</span></Form.Label>
              <Form.Control as="select" custom onChange={(e) => setCategory(e.target.value)}  id="control" required>
                <option value="">choose your payment category</option>
                <option value="college fee">college fee</option>
                <option value="hostel fee">hostel fee</option>
                <option value="bus fee">bus fee</option>
                <option value="exam fee">exam fee</option>
                <option value="building fee">building fee</option>
                <option value="other fee">other fee</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAmount">
             
                <Form.Label id="label">Amount <span className='text-danger'>★</span>
                 </Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder='enter amount you want to pay now' id="control"
                />
              </Form.Group> 
                   
                  
            <br />
           
            
            <Button variant="primary" type="submit" disabled={loading} id="btn"> 
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </Button>

          </Form>
        </Card>
        </div>
    </>
  );
};

export default PaymentForm;