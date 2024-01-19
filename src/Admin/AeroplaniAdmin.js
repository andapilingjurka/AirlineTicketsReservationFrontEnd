import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Aeroplanet() {
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
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
          <h4 className="description">Të dhënat për Aeroplanin</h4>
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

            <label className="label">Kompania</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={kompania}
              onChange={(event) => {
                setKompania(event.target.value);
              }}
            />
             <label className="label">Nr i Ulëseve VIP</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={nr_Uleseve_VIP}
              onChange={(event) => {
                setNrUleseveVip(event.target.value);
              }}
            />
            <label className="label">Nr i Ulëseve Biznes</label>
             <input
              type="text"
              className="form-control"
              id="name"
              value={nr_Uleseve_Biznes}
              onChange={(event) => {
                setNrUleseveBiznes(event.target.value);
              }}
            />
            <label className="label">Nr i Ulëseve Ekonomike</label>
               <input
              type="text"
              className="form-control"
              id="name"
              value={nr_Uleseve_Ekonomike}
              onChange={(event) => {
                setNrUleseveEkonomike(event.target.value);
              }}
            />
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
              <th scope="col">Kompania</th>
              <th scope="col">Nr i Ulëseve VIP</th>
              <th scope="col">Nr i Ulëseve Biznes</th>
              <th scope="col">Nr i Ulëseve Ekonomike</th>

              <th scope="col">Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {aeroplanet.map(function fn(aeroplani) {
              return (
                <tr key={aeroplani.id}>
                  <td>{aeroplani.id}</td>
                  <td>{aeroplani.kompania}</td>
                  <td>{aeroplani.nr_Uleseve_VIP}</td>
                  <td>{aeroplani.nr_Uleseve_Biznes}</td>
                  <td>{aeroplani.nr_Uleseve_Ekonomike}</td>
                  <td className="d-flex align-items-center button-container ">
                    <button
                      type="button"
                      className="btn btn-warning mx-1 button"
                      onClick={() => editAeroplani(aeroplani)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-1 button"
                      onClick={() => deleteAeroplani(aeroplani.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Aeroplanet;