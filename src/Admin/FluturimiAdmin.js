import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
function Fluturimet(){ 
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };
  const [id, setId] = useState("");
  const [nrFluturimit, setNrFluturimit] = useState("");
  const [deparuteAirport, setDeparuteAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [kohaENisjes, setKohaENisjes] = useState("");
  const [kohaEArritjes, setKohaEArritjes] = useState("");
  const [cmimi, setCmimi] = useState("");
  const [qytetiId, setQytetiId] = useState("");
  const [aeroplaniId, setAeroplaniId] = useState("");
  const [qytetet, setQytetet] = useState([]);
  const [aeroplanet, setAeroplanet] = useState([]);
  const [fluturimet, setFluturimet] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await loadFlights();
      await loadAirplanes();
      await loadCities();
    })();
  }, []);

  async function loadAirplanes() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Aeroplani/GetAllList"
      );
      setAeroplanet(result.data);
    } catch (err) {
      console.error("Error loading airplanes:", err);
    }
  }

  async function loadCities() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Qyteti/GetAllList"
      );
      setQytetet(result.data);
    } catch (err) {
      console.error("Error loading cities:", err);
    }
  }

  async function loadFlights() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Fluturimi/GetAllList"
      );
      setFluturimet(result.data);
    } catch (err) {
      console.error("Error loading flights:", err);
    }
  }

  const inputFileRef = useRef(null);

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7285/api/Fluturimi/Add", {
        nrFluturimit,
        deparuteAirport,
        arrivalAirport,
        kohaENisjes,
        kohaEArritjes,
        cmimi,
        qytetiId,
        aeroplaniId,
      });
      showAndHideAlert("Fluturimi është regjistruar me sukses!");
      clearForm();
      loadFlights();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function clearForm() {
    setId("");
    setNrFluturimit("");
    setDeparuteAirport("");
    setArrivalAirport("");
    setKohaENisjes("");
    setKohaEArritjes("");
    setCmimi("");
    setQytetiId("");
    setAeroplaniId("");
    
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }

  async function editFluturimi(fluturimi) {
    setId(fluturimi.id);
    setNrFluturimit(fluturimi.nrfluturimit);
    setDeparuteAirport(fluturimi.deparuteAirport);
    setArrivalAirport(fluturimi.arrivalAirport);
    setKohaENisjes(fluturimi.kohaENisjes);
    setKohaEArritjes(fluturimi.kohaEArritjes);
    setCmimi(fluturimi.cmimi);
    setQytetiId(fluturimi.qytetiId);
    setAeroplaniId(fluturimi.aeroplaniId);
  }

  async function deleteFluturimi(fluturimiId) {
    try {
      await axios.delete(
        `https://localhost:7285/api/Fluturimi/Delete?Id=${fluturimiId}`
      );
      showAndHideAlert("Fluturimi është fshir me sukses!");
      clearForm();
      loadFlights();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const fluturimi = fluturimet.find((p) => p.id === id);
      await axios.put(`https://localhost:7285/api/Fluturimi/Update/${fluturimi.id}`, {
        id:fluturimi.id,
        nrFluturimit: nrFluturimit,
        deparuteAirport: deparuteAirport,
        arrivalAirport: arrivalAirport,
        kohaENisjes:kohaENisjes,
        kohaEArritjes:kohaEArritjes,
        cmimi:cmimi,
        qytetiId:qytetiId,
        aeroplaniId:aeroplaniId,
      });
      showAndHideAlert("Fluturimi është edituar me sukses!");
      clearForm();
      loadFlights();
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

export default Fluturimet;