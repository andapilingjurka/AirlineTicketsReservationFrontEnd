import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Kontaktet() {
  const [toggle, setToggle] = useState(true);
  const [kontakts, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle);
  };


    useEffect(() => {
      Load();
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
        const result = await axios.get('https://localhost:7054/api/Kontakt/GetAllList ');
        setUsers(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    async function handleDelete(kontaktID) {
      try {
        await axios.delete(`https://localhost:7054/api/Kontakt/Delete?Id=${kontaktID}`);
        showAndHideAlert("Kontakti është fshir me sukses!");
       
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
          <h4 className="description">Të dhënat për Kontaktet</h4>
          <div className="container mt-4">
          
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
                  <th scope="col">Email</th>
                  <th scope="col">Mesazhi</th>
                  <th scope="col">Opsionet</th>
                </tr>
              </thead>
              <tbody>
                {kontakts.map(function fn(kontakt) {
                  return (
                    <tr key={kontakt.id}>
                      <td>{kontakt.kontaktID}</td>
                      <td>{kontakt.emri}</td>
                      <td>{kontakt.emaili}</td>
                      <td>{kontakt.mesazhi}</td>

                      <td className="d-flex align-items-center button-container ">
                      <td>
                      <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => handleDelete(kontakt.kontaktID)}
                          >
                            Delete
                          </button>             
                           </td>
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
        </div>

      );
    }
    
    export default Kontaktet;