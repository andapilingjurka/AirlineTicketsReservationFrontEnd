import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./cssRezervimet.css";
import { useLocation } from "react-router-dom";
import PaymentForm from './PaymentForm';
import plane from './plane .jpg';
import MyNavbar from "../include/Navbar";
import Footer from  "../include/Footer";
import { useNavigate } from 'react-router-dom';


function Rezervime() {
  const navigate = useNavigate();
    const [id, setId] = useState("");
  const [emriPasagjerit, setEmriPasagjerit] = useState("");
  const [mbiemriPasagjerit, setMbiemriPasagjerit] = useState("");
  const [email, setEmail] = useState("");
  const [klasi, setKlasi] = useState("");
  const [cmimi, setCmimi] = useState(200);
  const [currency, setCurrency] = useState("");
  const [kthyese, setKthyese] = useState(false);
  const [fluturimiId, setFluturimiId] = useState("");
  const [fluturimet, setFluturimet] = useState([]);
  const [data_e_Rezervimit, setDataERezervimit] = useState("");
  const [data_e_Kthimit, setDataEKthimit] = useState("");
  const [rezervimet, setRezervimet] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const location = useLocation();
  const [flightId, setFlightId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("flightId");

    if (id) {
      setFlightId(id);
    }
  }, [location.search]);
  useEffect(() => {
    // Set fluturimiId based on flightId
    if (flightId) {
      const selectedFlight = fluturimet.find((fluturimi) => fluturimi.id === flightId);
      if (selectedFlight) {
        setFluturimiId(selectedFlight.id);
      }
    }
  }, [flightId, fluturimet]);

  useEffect(() => {
    (async () => {
      await loadFlights();
      await loadReservations();

    })();
  }, []);

  async function loadFlights() {
    try {
      const result = await axios.get("https://localhost:7285/api/Fluturimi/GetAllList");
      setFluturimet(result.data);
    } catch (err) {
      console.error("Error loading flights:", err);
    }
  }

  async function loadReservations() {
    try {
      const result = await axios.get("https://localhost:7285/api/Rezervimi/GetAllList");
      setRezervimet(result.data);
    } catch (err) {
      console.error("Error loading reservations:", err);
    }
  }

  const inputFileRef = useRef(null);

  async function save(event) { 
    event.preventDefault();
    const selectedCurrency = currency === "EUR" ? "EUR" : "USD";
  
    try {
      await axios.post(`https://localhost:7285/api/Rezervimi/AddRezervimi`,{
        emriPasagjerit,
        mbiemriPasagjerit,
        email,
        klasi:klasi,
        cmimi:200,
        currency: selectedCurrency,
        data_e_Kthimit: kthyese ? data_e_Kthimit : null,
        data_e_Rezervimit,
        
        fluturimiId:flightId,
      });
      alert('Save successful!');
      setShowPaymentForm(true);
    } catch (err) {
      alert(err);
    }
  }
  
  
     
   
   
    
  

  function clearForm() {
    setId("");
    setEmriPasagjerit("");
    setMbiemriPasagjerit("");
    setEmail("");
    setCmimi("");
    setKlasi("");
    setCurrency("");
    setKthyese(false);

    setFluturimiId("");
    setDataERezervimit("");
    setDataEKthimit("");

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }

  function showAndHideAlert(message, isError = false) {
    setAlertMessage(message);
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
  }
  const handlePaymentSuccess = async () => {
    alert('Payment successful!');
    setPaymentSuccess(true);
    setId("");
    setEmriPasagjerit("");
    setMbiemriPasagjerit("");
    setEmail("");
    setCmimi("");
    setKlasi("");
    setCurrency("");
    setKthyese(false);

    setFluturimiId("");
    setDataERezervimit("");
    setDataEKthimit("");
    loadReservations("");
  };
  // Check if the user is authenticated by verifying the presence of the authentication token
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    alert('Ju duhet të jeni të kyçur për të bërë një rezervim!');
    navigate('/fluturime');
    return;
  }
 
  return (
    <div>

    <MyNavbar/>
    <div className="rezervime" style={{
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      display: 'flex',
      alignItems: 'stretch',
  }}>
    {/* Your content goes here */}
        {!showPaymentForm && !paymentSuccess && (
          <div className="rezervime-container mt-4">
            <form onSubmit={save}>
              <div className="rezervime-form-group">
                <input
                  type="text"
                  className="rezervime-form-control"
                  id="id"
                  hidden
                  value={id}
                  onChange={handlePaymentSuccess}
                />
              </div>
      <div className="rezervime-form-group">
        <label className="rezervime-label">Emri i Pasagjerit</label>
        <input
          type="text"
          className="rezervime-form-control"
          id="emriPasagjerit"
          value={emriPasagjerit}
          onChange={(event) => {
            setEmriPasagjerit(event.target.value);
          }}
        />
      </div>
      <div className="rezervime-form-group">
        <label className="rezervime-label">Mbiemri i Pasagjerit</label>
        <input
          type="text"
          className="rezervime-form-control"
          id="mbiemriPasagjerit"
          value={mbiemriPasagjerit}
          onChange={(event) => {
            setMbiemriPasagjerit(event.target.value);
          }}
        />
      </div>
      <div className="rezervime-form-group">
        <label className="rezervime-label">Email</label>
        <input
          type="text"
          className="rezervime-form-control"
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="rezervime-form-group">
        <label className="rezervime-label">Klasi</label>
        <select
          className="rezervime-form-control"
          id="klasi"
          value={klasi}
          onChange={(event) => {
            setKlasi(event.target.value);
          }}
        >
          <option value="">Select class</option>
          <option value="Economic">Economic</option>
          <option value="Business">Business</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <div className="rezervime-form-group">
        <label className="rezervime-label">Cmimi</label>
        <input
          readOnly
          type="text"
          className="rezervime-form-control"
          id="cmimi"
          value={cmimi}
          onChange={(event) => {
            setCmimi(event.target.value);
          }}
        />
      </div>
  
      <div className="rezervime-form-group">
        <label className="rezervime-label mr-4" style={{ marginRight: '10px' }}>Currency</label>
        <div className="rezervime-form-check rezervime-form-check-inline ml-2">
          <input
            type="checkbox"
            className="rezervime-form-check-input"
            id="eurCheckbox"
            checked={currency === "EUR"}
            onChange={() => setCurrency("EUR")}
          />
          <label className="rezervime-form-check-label white-text" htmlFor="eurCheckbox" style={{ color: 'white' }}>
            EUR
          </label>
        </div>
        <div className="rezervime-form-check rezervime-form-check-inline">
          <input
            type="checkbox"
            className="rezervime-form-check-input"
            id="usdCheckbox"
            checked={currency === "USD"}
            onChange={() => setCurrency("USD")}
          />
          <label className="rezervime-form-check-label white-text" htmlFor="usdCheckbox" style={{ color: 'white' }}>
            USD
          </label>
        </div>
      </div>
  
      <div className="rezervime-form-group">
        <label className="rezervime-label" style={{ marginRight: '10px' }}>Kthyese</label>
        <input
          type="checkbox"
          className="rezervime-form-check-input"
          id="kthyese"
          checked={kthyese}
          onChange={(event) => {
            setKthyese(event.target.checked);
          }}
        />
      </div>
  
      {/* Conditionally render "Data e Kthimit" input */}
      {kthyese && (
        <div className="rezervime-form-group">
          <label className="rezervime-label">Data e Kthimit</label>
          <input
            type="date"
            className="rezervime-form-control"
            id="data_e_Kthimit"
            value={data_e_Kthimit}
            onChange={(event) => {
              setDataEKthimit(event.target.value);
            }}
          />
        </div>
      )}
      <div className="rezervime-form-group">
        <label className="rezervime-label">Data e Rezervimit</label>
        <input
          type="date"
          className="rezervime-form-control"
          id="data_e_Rezervimit"
          value={data_e_Rezervimit}
          onChange={(event) => {
            setDataERezervimit(event.target.value);
          }}
        />
      </div>
      <div className="rezervime-form-group">
    <label className="rezervime-label">Fluturimi: {flightId}</label>  
      
  </div>
      <div>
        <button type="submit"className="btn btn-success m-4 rezervime-button">
          Submit
        </button>
      </div>
    </form>
  </div>
        )}
  
  
  {showPaymentForm && !paymentSuccess && (
          <PaymentForm
            amount={cmimi}
            description={klasi}
            currency={currency}
            onSuccess={handlePaymentSuccess}
          />
        )}
  
  {paymentSuccess && (
          <div>
            <p>Payment successful! Thank you for your reservation.</p>
            {/* Additional content or redirection can go here */}
          </div>
        )}
      </div>
      <Footer/>
      </div>
     
    );
  };
  export default Rezervime;  