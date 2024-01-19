import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';


function Fluturimet(){ 
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
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
 // Kushti per kontrollimin nese eshte admin
 if (!decodedToken || decodedToken.role !== 'admin') {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman, serif', fontWeight: 'bold',position: 'relative', marginTop:'250px'}}>
      Ju nuk keni akses në këtë faqe!
    </h1>  
    </div>
  );
}
  return (
    <div
    className="container-fluid"
    style={{
      backgroundColor: "#004687",
      minHeight: "100vh",
      backgroundSize: "cover",
    }}
  >
    <div className="row">
      {toggle && (
        <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
          <Sidebar />
        </div>
      )}

      <div className="col-4 col-md-2"></div>
      <div className="col">
        <Nav Toggle={Toggle} />

       <div>
          <h4 className="description">Të dhënat për Fluturime</h4>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
  
            <label className="label">Numri i Fluturimit</label>
            <input
              type="text"
              className="form-control"
              id="nrFluturimit"
              value={nrFluturimit}
              onChange={(event) => {
                setNrFluturimit(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Departure Airport</label>
            <input
              type="text"
              className="form-control"
              id="deparuteAirport"
              value={deparuteAirport}
              onChange={(event) => {
                setDeparuteAirport(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Arrival Airport</label>
            <input
              type="text"
              className="form-control"
              id="arrivalAirport"
              value={arrivalAirport}
              onChange={(event) => {
                setArrivalAirport(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Koha e Nisjes</label>
            <input
              type="datetime-local"
              className="form-control"
              id="kohaENisjes"
              value={kohaENisjes}
              onChange={(event) => {
                setKohaENisjes(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Koha e Arritjes</label>
            <input
              type="datetime-local"
              className="form-control"
              id="kohaEArritjes"
              value={kohaEArritjes}
              onChange={(event) => {
                setKohaEArritjes(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Cmimi</label>
            <input
              type="text"
              className="form-control"
              id="cmimi"
              value={cmimi}
              onChange={(event) => {
                setCmimi(event.target.value);
              }}
            />
          </div>
  
          <div className="form-group">
            <label className="label">Qyteti</label>
            <select
              className="form-control"
              id="qyteti"
              value={qytetiId}
              onChange={(event) => setQytetiId(event.target.value)}
            >
              <option value="">Select a city</option>
              {qytetet.map((qyteti) => (
                <option key={qyteti.id} value={qyteti.id}>
                  {qyteti.emri}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <label className="label">Aeroplani</label>
            <select
              className="form-control"
              id="shteti"
              value={aeroplaniId}
              onChange={(event) => setAeroplaniId(event.target.value)}
            >
              <option value="">Select an Airplane</option>
              {aeroplanet.map((aeroplani) => (
                <option key={aeroplani.id} value={aeroplani.id} style={{ color: 'black' }}>
                  {aeroplani.kompania}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <button className="btn btn-success m-4 button" onClick={save}>
              Save
            </button>
            <button className="btn btn-warning m-4 button" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
  
      {/* Alert Message */}
      {isAlertVisible && (
        <div
          className={`alert ${
            alertMessage.includes("Error") ? "alert-danger" : "alert-success"
          }`}
        >
          {alertMessage}
        </div>
      )}
      <div className="table-responsive m-3">
        <table className="table border-gray">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Numri i Fluturimit</th>
              <th scope="col">Departure Airport</th>
              <th scope="col">Arrival Airport</th>
              <th scope="col">Koha e Nisjes</th>
              <th scope="col">Koha e Arritjes</th>
              <th scope="col">Cmimi</th>
              <th scope="col">QytetiID</th>
              <th scope="col">AeroplaniID</th>
              <th scope="col">Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {fluturimet.map((fluturimi) => (
              <tr key={fluturimi.id}>
                <td>{fluturimi.id}</td>
                <td>{fluturimi.nrFluturimit}</td>
                <td>{fluturimi.deparuteAirport}</td>
                <td>{fluturimi.arrivalAirport}</td>
                <td>{fluturimi.kohaENisjes}</td>
                <td>{fluturimi.kohaEArritjes}</td>
                <td>{fluturimi.cmimi}</td>
                <td>{fluturimi.qytetiId}</td>
                <td>{fluturimi.aeroplaniId}</td>
  
                <td>
                  <div className="button-container">
                    <button
                      type="button"
                      className="btn btn-warning mx-1 button"
                      onClick={() => editFluturimi(fluturimi)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-1 button"
                      onClick={() => deleteFluturimi(fluturimi.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Fluturimet;