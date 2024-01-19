import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./cssRezervime.css";
import { useLocation } from "react-router-dom";

function Rezervime() {
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
      const payload = {
        emriPasagjerit,
        mbiemriPasagjerit,
        email,
        klasi,
        cmimi,
        currency: selectedCurrency,
        data_e_Kthimit: kthyese ? data_e_Kthimit : null,
        data_e_Rezervimit,
        
        fluturimiId:flightId,
      };
  
      console.log("Payload:", payload); // Check if the payload is correct
  
      await axios.post(`https://localhost:7285/api/Rezervimi/AddRezervimi`, payload);
      
      showAndHideAlert("Rezervimi është regjistruar me sukses!");
      clearForm();
      loadReservations();
   
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
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


  return (
     
     
  );
}
export default Rezervime;