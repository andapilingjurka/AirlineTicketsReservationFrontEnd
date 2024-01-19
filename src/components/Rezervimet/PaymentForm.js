import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paypal from './paypal.jpg'; // Import your image file

import './payment.css';
const PaymentForm = ({ amount, description, currency, onSuccess }) => {
  const [paymentData, setPaymentData] = useState({
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
      email: '',
      description:description ? description.toString() : '',
      currency: currency ? currency.toString() : '',
      amount: amount ? amount.toString() : '', // Check if amount is defined before calling toString
    });
   
  useEffect(() => {
    // Update the amount in the state when the prop changes
    setPaymentData((prevData) => ({
      ...prevData,
      amount: amount ? amount.toString() : '', // Check if amount is defined before calling toString
      description:description ? description.toString() : '',
      currency: currency ? currency.toString() : '',

    }));
  }, [amount, description, currency]); // Corrected dependencies array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure you handle the submission to Stripe or your backend appropriately
    try {
      const response = await fetch('https://localhost:7239/api/payment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        // Payment successful, you can redirect or show a success message

        // Call the onSuccess callback to handle the payment success in the parent component
        onSuccess();
      } else {
        // Handle errors or show an error message to the user
        console.error('Payment failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  
  return (
   
      <form onSubmit={handleFormSubmit} className="container mt-5">
                <img src={paypal} className="img-fluid" style={{ width: '75%' }} alt="Featured" />

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
  
          <div className="col-md-6 mb-3">
            <label className="form-label">Card Number:</label>
            <div className="input-group">
              <input
                type="text"
                name="cardNumber"
                className="form-control"
                onChange={handleInputChange}
              />
              <label className="input-group-text">Card Number</label>
            </div>
          </div>
  
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiration Month </label>
            <input
              type="number"
              name="expirationMonth"
              className="form-control"
              onChange={handleInputChange}
              min="1"
              max="12"
            />
          </div>
  
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiration Year</label>
            <input
              type="number"
              name="expirationYear"
              className="form-control"
              onChange={handleInputChange}
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 5}
            />
          </div>
  
          <div className="col-md-6 mb-3">
            <label className="form-label">CVC:</label>
            <input
              type="text"
              name="cvc"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
  
          <div className="col-md-6 mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              name="description"
              value={paymentData.description}
              className="form-control"
              readOnly
            />
          </div>
  
      
  
          <div className="col-md-6 mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="text"
              name="amount"
              value={paymentData.amount}
              className="form-control"
              readOnly
            />
          </div>

            {/* Existing Description, Currency, and Amount Inputs (read-only) */}
            <div className="col-md-6 mb-3">
            <label className="form-label">Currency:</label>
            <input
              type="text"
              name="currency"
              value={paymentData.currency}
              className="form-control"
              readOnly
            />
          </div>
        </div>
  
        <button type="submit" className="btn btn-primary">
          Submit Payment
        </button>
      </form>
    );
  };
  
  export default PaymentForm;