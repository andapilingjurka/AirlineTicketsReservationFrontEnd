import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";

function Rezervimet() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

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
  const [isAlertVisible, setIsAlertVisible] = useState(false);

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
        
        fluturimiId,
      };
      console.log("Payload:", payload); // Check if the payload is correct
  
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

  async function editRezervimi(rezervimi) {
    setId(rezervimi.id);
    setEmriPasagjerit(rezervimi.emriPasagjerit);
    setMbiemriPasagjerit(rezervimi.mbiemriPasagjerit);
    setEmail(rezervimi.email);
    setCmimi(rezervimi.cmimi);
    setKlasi(rezervimi.klasi);
    setCurrency(rezervimi.currency);
    setKthyese(rezervimi.kthyese);
    setFluturimiId(rezervimi.fluturimiId);
    setDataERezervimit(new Date(rezervimi.data_e_Rezervimit).toISOString().split('T')[0]);
    setDataEKthimit(new Date(rezervimi.data_e_Kthimit).toISOString().split('T')[0]);
  }

  async function deleteRezervimi(rezervimiId) {
    try {
      console.log("Deleting reservation with ID:", rezervimiId);
      await axios.delete(`https://localhost:7285/api/Rezervimi/Delete?Id=${rezervimiId}`);
      showAndHideAlert("Rezervimi është fshir me sukses!");
      clearForm();
      loadReservations();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const rezervimi = rezervimet.find((p) => p.id === id);
      await axios.put(`https://localhost:7285/api/Rezervimi/Update/${rezervimi.id}`, {
        id: rezervimi.id,
        emriPasagjerit:emriPasagjerit,
        mbiemriPasagjerit:mbiemriPasagjerit,
        email:email,
        cmimi: cmimi,
        klasi: klasi,
        currency: currency,
        kthyese: kthyese,
       
        fluturimiId: fluturimiId,
        data_e_Rezervimit: data_e_Rezervimit,
        data_e_Kthimit: data_e_Kthimit,
      });
      showAndHideAlert("Rezervimi është edituar me sukses!");
      clearForm();
      loadReservations();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
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

export default Rezervimet;