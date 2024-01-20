import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Rezervimet() {
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
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
    <div className="container-fluid" style={{ backgroundColor: "#004687", minHeight: "100vh", backgroundSize: "cover" }}>
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
            <h4 className="description">Të dhënat për Rezervime</h4>
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
                  <div className="form-group">
                  <label className="label">Emri i Pasagjerit</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emriPasagjerit"
                    value={emriPasagjerit}
                    onChange={(event) => {
                      setEmriPasagjerit(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Mbiemri i Pasagjerit</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mbiemriPasagjerit"
                    value={mbiemriPasagjerit}
                    onChange={(event) => {
                      setMbiemriPasagjerit(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                  <label className="label">Klasi</label>
                  <select
                    className="form-control"
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
                <div className="form-group">
                  <label className="label">Cmimi</label>
                  <input disabled
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
              <label className="label mr-4" style={{ marginRight: '10px' }} >Currency</label>
              <div className="form-check form-check-inline ml-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="eurCheckbox"
                  checked={currency === "EUR"}
                  onChange={() => setCurrency("EUR")}
                />
                <label className="form-check-label white-text" htmlFor="eurCheckbox" style={{color: 'white'}}>
                  EUR
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="usdCheckbox"
                  checked={currency === "USD"}
                  onChange={() => setCurrency("USD")}
                />
                <label className="form-check-label white-text" htmlFor="usdCheckbox" style={{color: 'white'}}>
                  USD
                </label>
              </div>
            </div>

                <div className="form-group" >
                  <label className="label" style={{ marginRight: '10px' }}>Kthyese</label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="kthyese"
                    checked={kthyese}
                    onChange={(event) => {
                      setKthyese(event.target.checked);
                    }}
                  />
                </div>

                {/* Conditionally render "Data e Kthimit" input */}
                {kthyese && (
                  <div className="form-group">
                    <label className="label">Data e Kthimit</label>
                    <input
                      type="date"
                      className="form-control"
                      id="data_e_Kthimit"
                      value={data_e_Kthimit}
                      onChange={(event) => {
                        setDataEKthimit(event.target.value);
                      }}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label className="label">Data e Rezervimit</label>
                  <input
                    type="date"
                    className="form-control"
                    id="data_e_Rezervimit"
                    value={data_e_Rezervimit}
                    onChange={(event) => {
                      setDataERezervimit(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label" >Fluturimi</label>
                  <select style={{ color: 'black' }}
                    className="form-control"
                    id="fluturimi"
                    value={fluturimiId}
                    onChange={(event) => setFluturimiId(event.target.value)}
                  >
                    <option value="" style={{ color: 'black' }}>Select a flight</option>
                    {fluturimet.map((fluturimi) => (
                      <option key={fluturimi.id} value={fluturimi.id} style={{ color: 'black' }}>
                        {fluturimi.id}
                      </option>
                    ))}
                  </select>
                </div>

                

                <div>
                 
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
                    <th scope="col">Emri i Pasagjerit</th>
                    <th scope="col">Mbiemri i Pasagjerit</th>
                    <th scope="col">Email</th>
                    <th scope="col">Klasi</th>
                    <th scope="col">Cmimi </th>
                    <th ></th>
                    <th scope="col">Currency</th>
                    <th ></th>
                    <th scope="col">Lloji</th>
                    <th ></th>
                    <th scope="col">Data e Rezervimit</th>
                    <th scope="col">Data e Kthimit</th>
                    <th scope="col">FluturimiID</th>
                   
                    <th scope="col">Opsionet</th>
                  </tr>
                </thead>
                <tbody>
                  {rezervimet.map((rezervimi) => (
                    <tr key={rezervimi.id}>
                      <td>{rezervimi.id}</td>
                      <td>{rezervimi.emriPasagjerit}</td>
                      <td>{rezervimi.mbiemriPasagjerit}</td>
                      <td>{rezervimi.email}</td>
                      <td>{rezervimi.klasi}</td>
                      <td>{rezervimi.cmimi}</td>
                      <td></td>
                      <td>{rezervimi.currency}</td>
                      <td></td>
                      <td>{rezervimi.kthyese ? 'Kthyese' : 'NjeDrejtim'}</td>
                      <td></td>
                      <td>{rezervimi.data_e_Rezervimit}</td>
                      <td>{rezervimi.kthyese ? rezervimi.data_e_Kthimit : '-'}</td>
                      <td>{rezervimi.fluturimiId}</td>
                     

                      <td>
                        <div className="button-container">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editRezervimi(rezervimi)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteRezervimi(rezervimi.id)}
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

export default Rezervimet;