import React, { useEffect, useState } from "react";
import axios from "axios";

import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";

function Aeroplanet() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };
  const [id, setId] = useState("");
  const [kompania, setKompania] = useState("");
  const [nr_Uleseve_VIP, setNrUleseveVip] = useState("");
  const [nr_Uleseve_Biznes, setNrUleseveBiznes] = useState("");
  const [nr_Uleseve_Ekonomike, setNrUleseveEkonomike] = useState("");
  const [aeroplanet, setAeroplanet] = useState([])
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Aeroplani/GetAllList"
      );
      setAeroplanet(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7285/api/Aeroplani/Add", {
        kompania: kompania,
        nr_Uleseve_VIP: nr_Uleseve_VIP,
        nr_Uleseve_Biznes: nr_Uleseve_Biznes,
        nr_Uleseve_Ekonomike: nr_Uleseve_Ekonomike,
        
      });
      showAndHideAlert("Aeroplani është regjistruar me sukses!");
      setId("");
      setKompania("");
      setNrUleseveVip("");
      setNrUleseveBiznes("");
      setNrUleseveEkonomike("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function editAeroplani(aeroplani) {
    setId(aeroplani.id);
    setKompania(aeroplani.kompania);
    setNrUleseveVip(aeroplani.nr_Uleseve_VIP);
    setNrUleseveBiznes(aeroplani.nr_Uleseve_Biznes);
    setNrUleseveEkonomike(aeroplani.nr_Uleseve_Ekonomike);
  }

  async function deleteAeroplani(id) {
    try {
      await axios.delete(`https://localhost:7285/api/Aeroplani/Delete?Id=${id}`);
      showAndHideAlert("Aeroplani është fshir me sukses!");
      setId("");
      setKompania("");
      setNrUleseveVip("");
      setNrUleseveBiznes("");
      setNrUleseveEkonomike("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const aeroplani = aeroplanet.find((p) => p.id === id);
      await axios.put(`https://localhost:7285/api/Aeroplani/Update/${aeroplani.id}`, {
        id: aeroplani.id,
        kompania: kompania,
        nr_Uleseve_VIP: nr_Uleseve_VIP,
        nr_Uleseve_Biznes: nr_Uleseve_Biznes,
        nr_Uleseve_Ekonomike: nr_Uleseve_Ekonomike,
      });
      showAndHideAlert("Aeroplani është edituar me sukses!");
      setId("");
      setKompania("");
      setNrUleseveVip("");
      setNrUleseveBiznes("");
      setNrUleseveEkonomike("");
      Load();
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

  ///////////////////////////////////////////////////////////////
  return (
   
  );
}

export default Aeroplanet;