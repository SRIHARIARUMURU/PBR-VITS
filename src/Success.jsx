import React, {  useState, useRef } from 'react';
import { Card, Button, Container, Spinner,Alert } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css'
const Success = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('userId');
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const amount = localStorage.getItem('amount');
const category=localStorage.getItem('category')
const name=localStorage.getItem("name");
const rollNumber=localStorage.getItem("roll")
  const profileRef = useRef(null);
  

 

  

 
        

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Payment Success',
          text: `PBR VITS ${category} Payment successfully completed`,
          url: window.location.href,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser');
    }
  };

  const downloadPDF = async () => {
    setLoading(true);

    try {
      const contentRef = profileRef.current;

      if (contentRef) {
        const canvas = await html2canvas(contentRef);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('payment_receipt.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '100px' ,marginBottom:"100px"}}>
    
      
      <Container style={{ width: '330px' }} id="sub" className='bg-light'>
      
      
          <Card style={{ backgroundColor: 'lightgreen' }}>
            <Card.Header className='text-success'>Payment successfully completed</Card.Header>
            <Card.Body ref={profileRef}>
              <p className='h6'>Name: <span className="text-danger">{name}</span> </p>
              <hr />
              <p className='h6'>Roll Number: <span className="text-danger">{rollNumber}</span> </p>
              <hr />
             
              <p className='h6'>Amount: <span className="text-danger">{amount}</span> </p>
              <hr />
              <p className='h6'>Category of fee: <span className="text-danger">{category}</span> </p><hr />
              <p className='h6'>status: <span className="text-danger">success</span> </p>
              <hr />
              <p className='h6'>Transaction ID: <span className="text-danger">{userId}</span> </p>
              <hr />
            </Card.Body>
           
          </Card>
       
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginTop: "20px" }}>
         
          <Button variant='primary' onClick={share} id='btn'>
            Share
          </Button>
          <br></br>
          <Button variant='success' onClick={downloadPDF} disabled={loading} id='btn'>
            {loading ? <Spinner animation="border" size="sm" /> : 'Download PDF'}
          </Button>
        </div>
      </Container>
     
    </div>
  );
};

export default Success;