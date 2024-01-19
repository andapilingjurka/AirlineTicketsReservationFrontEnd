import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Shtetet() {
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [emri, setEmri] = useState("");
  const [shtetet, setShtetet] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

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

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7285/api/Shteti/GetAllList"
      );
      setShtetet(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7285/api/Shteti/Add", {
        emri: emri,
      });
      showAndHideAlert("Shteti është regjistruar me sukses!");
      setId("");
      setEmri("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function editShteti(shteti) {
    setEmri(shteti.emri);
    setId(shteti.id);
  }

  async function deleteShteti(id) {
    try {
      await axios.delete(`https://localhost:7285/api/Shteti/Delete?Id=${id}`);
      showAndHideAlert("Shteti është fshir me sukses!");
      setId("");
      setEmri("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const shteti = shtetet.find((p) => p.id === id);
      await axios.put(`https://localhost:7285/api/Shteti/Update/${shteti.id}`, {
        id: shteti.id,
        emri: emri,
      });
      showAndHideAlert("Shteti është edituar me sukses!");
      setId("");
      setEmri("");
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
            <h4 className="description">Të dhënat për Shtetin</h4>
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
                    id="name"
                    value={emri}
                    onChange={(event) => {
                      setEmri(event.target.value);
                    }}
                  />
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

                    <th scope="col">Opsionet</th>
                  </tr>
                </thead>
                <tbody>
                  {shtetet.map(function fn(shteti) {
                    return (
                      <tr key={shteti.id}>
                        <td>{shteti.id}</td>
                        <td>{shteti.emri}</td>

                        <td className="d-flex align-items-center button-container ">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editShteti(shteti)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteShteti(shteti.id)}
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

export default Shtetet;
