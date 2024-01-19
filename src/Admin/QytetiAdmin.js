import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Qytetet() {
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [emri, setEmri] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [shtetiId, setshtetiId] = useState("");
  const [states, setStates] = useState([]);
  const [qytetet, setQytetet] = useState([]);

  const [orderBy, setOrderBy] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await loadStates();
      await loadCities();
    })();
  }, []);

 
  async function loadStates() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Shteti/GetAllList"
      );
      setStates(result.data);
    } catch (err) {
      console.error("Error loading states:", err);
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

  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Check if orderBy is not an empty string before making the API call
    if (orderBy) {
      if (orderBy === "Normal") {
        // Handle the case for "Normal" (unfiltered) data
        loadCities(); // Load the unfiltered data
      } else {
        filterQyteti(orderBy);
      }
    }
  }, [orderBy]); // This effect will re-run whenever orderBy changes

  async function filterQyteti(orderBy) {
    try {
      const result = await axios.get(
        `https://localhost:7285/api/Qyteti/GetFilteredQyteti?orderBy=${orderBy}`
      );
      setQytetet(result.data);
    } catch (err) {
      console.error("Error filtering cities:", err);
    }
  }
  //////////////////////////////////////////////////////////////////////////////

  const inputFileRef = useRef(null);

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7285/api/Qyteti/Add", {
        emri: emri,
        zipCode: zipCode,
        image: image,
        shtetiId: shtetiId,
      });
      showAndHideAlert("Qyteti është regjistruar me sukses!");
      clearForm();
      loadCities();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function clearForm() {
    setId("");
    setEmri("");
    setZipCode("");
    setImage("");
    setshtetiId("");
    setSelectedImage(null);
    inputFileRef.current.value = "";
  }

  async function editQyteti(qyteti) {
    setEmri(qyteti.emri);
    setZipCode(qyteti.zipCode);
    setImage(qyteti.image);
    setSelectedImage(qyteti.image);
    setshtetiId(qyteti.shtetiId);
    setId(qyteti.id);
  }

  async function deleteQyteti(cityId) {
    try {
      await axios.delete(
        `https://localhost:7285/api/Qyteti/Delete?Id=${cityId}`
      );
      showAndHideAlert("Qyteti është fshir me sukses!");
      clearForm();
      loadCities();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const qyteti = qytetet.find((p) => p.id === id);
      await axios.put(`https://localhost:7285/api/Qyteti/Update/${qyteti.id}`, {
        id: qyteti.id,
        emri: emri,
        zipCode: zipCode,
        image: image,
        shtetiId: shtetiId,
      });
      showAndHideAlert("Qyteti është edituar me sukses!");
      clearForm();
      loadCities();
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
            <h4 className="description">Të dhënat për Qytetin</h4>
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

                  <label className="label">Emri</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emri"
                    value={emri}
                    onChange={(event) => {
                      setEmri(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">ZipKodi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    value={zipCode}
                    onChange={(event) => {
                      setZipCode(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Foto</label>
                  <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control"
                    id="image"
                    onChange={(event) => {
                      setSelectedImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                      setImage("./images/" + event.target.files[0].name);
                    }}
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "150px",
                        marginTop: "10px",
                      }}
                      alt="SelectedImagePreview"
                    />
                  )}
                </div>
                <div className="form-group">
                  <label className="label">Shteti</label>
                  <select
                    className="form-control"
                    id="shteti"
                    value={shtetiId}
                    onChange={(event) => setshtetiId(event.target.value)}
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.emri}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="btn btn-success m-4 button" onClick={save}>
                    Save
                  </button>
                  <button
                    className="btn btn-warning m-4 button"
                    onClick={update}
                  >
                    Update
                  </button>
                </div>

                <div className="form-group" style={{ textAlign: "left" }}>
                  <select
                    className="form-control"
                    id="orderBy"
                    style={{ width: "130px" }}
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <option value="#">Select Filter</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </form>
            </div>
            <br></br>

            {/* Alert Message */}
            {isAlertVisible && (
              <div
                className={`alert ${
                  alertMessage.includes("Error")
                    ? "alert-danger"
                    : "alert-success"
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
                    <th scope="col">Emri</th>
                    <th scope="col">Zip Kodi</th>
                    <th scope="col">Foto</th>
                    <th scope="col">ShtetiID</th>
                    <th scope="col">Opsionet</th>
                  </tr>
                </thead>
                <tbody>
                  {qytetet.map(function fn(qyteti) {
                    return (
                      <tr key={qyteti.id}>
                        <td>{qyteti.id}</td>
                        <td>{qyteti.emri}</td>
                        <td>{qyteti.zipCode}</td>
                        <td>
                          <img
                            src={qyteti.image}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "150px",
                            }}
                            alt="CityPhoto"
                          />
                        </td>
                        <td>{qyteti.shtetiId}</td>
                        <td>
                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-warning mx-1 button"
                              onClick={() => editQyteti(qyteti)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-1 button"
                              onClick={() => deleteQyteti(qyteti.id)}
                            >
                              Delete
                            </button>
                          </div>
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

export default Qytetet;
