import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';


function Perdoruesit() {
  const [toggle, setToggle] = useState(true);
  const [perdoruesit, setPerdoruesit] = useState([]);
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
      const result = await axios.get('https://localhost:7285/api/Perdoruesi/GetAllList');
      setPerdoruesit(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://localhost:7285/api/Perdoruesi/Delete?Id=${id}`);
      showAndHideAlert("Perdoruesi është fshir me sukses!");
     
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
      <h4 className="description">Të dhënat për Perdoruesit</h4>
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
       <th scope="col">Mbiemri</th>
       <th scope="col">Emaili</th>
       <th scope="col">Fjalekalimi</th>
       <th scope="col">Roli</th>
       <th scope="col">Opsionet</th>
          </tr>
        </thead>
        <tbody>

          {perdoruesit.map((perdorues) => (
            <tr key={perdorues.id}>
              <td>{perdorues.id}</td>
              <td>{perdorues.firstName}</td>
              <td>{perdorues.lastName}</td>
              <td>{perdorues.email}</td>
              <td>{perdorues.password}</td>
              <td>{perdorues.role}</td>
            

              <td className="d-flex align-items-center button-container ">
              <td>
                <button type="button" className="btn btn-danger mx-1 button" onClick={() => handleDelete(perdorues.id)} >Delete</button>             
               </td>
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
     </div>
  );
}
export default Perdoruesit;