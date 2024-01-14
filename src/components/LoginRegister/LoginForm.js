import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { decodeToken } from './jwtUtils';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './style.css';

import login3 from './login3.jpg'; 
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token) {
    // User is already authenticated, redirect to the appropriate page
    const role = decodeToken(token).role;
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'client') {
      navigate('/');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7285/api/Perdoruesi/Login', {
        email,
        password,
      });

      const { token } = response.data;
localStorage.setItem('token', token);
      setMessage('Login successful');

      const role = decodeToken(token).role;
      if (response) {
        setMessage('Login successful');
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'client') {
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error.response.data);
      setMessage('Emaili ose Fjalekalimi gabim!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="row border rounded-5 p-3 bg-white shadow box-area">
      <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#FFFFFF' }}>
        <div className="featured-imagee mb-3">
        <img src={login3} className="img-fluid1" style={{ width: '100%' }} alt="Featured" />
        </div>
         
        </div>
        <div className="col-md-6 right-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h2>Mirë se vini!</h2>
              <p>Jemi të lumtur që ju kemi përsëri me ne.</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Emaili" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg bg-light fs-6" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Fjalekalimi" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg bg-light fs-6" />
            </Form.Group>
            <div className="input-group mb-3">
              <Button variant="primary" type="submit" className="btn btn-lg w-100 fs-6">
                Login
              </Button>
            </div>
            <div className="row">
            <small>Nuk keni një llogari?<Link to="/registration"> Regjistrohuni këtu</Link></small>

            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;