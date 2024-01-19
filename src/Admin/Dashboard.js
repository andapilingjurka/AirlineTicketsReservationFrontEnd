import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import React, { useState, useEffect } from "react";
import chart from "../images/chart.png";
import { useRating } from "../components/AboutUs/RatingContext";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function Dashboard() {
  const [toggle, setToggle] = useState(true);
  const { userRating, setUserRating, adminRating } = useRating();
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user rating from the server or any other storage method
    // For now, we'll just set it to 0 if it's undefined
    if (userRating === undefined) {
      setUserRating(0);
    }
  }, [userRating, setUserRating]);


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

  const Toggle = () => {
    setToggle(!toggle);
  };
  
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
          <div className="px-3">
            <div className="container-fluid">
              <div className="row g-3 my-2">
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">22,877</h3>{" "}
                      <p className="fs-5">Perdoruesit</p>
                    </div>
                    <i className="bi bi-people p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">21,154</h3>{" "}
                      <p className="fs-5">Fluturimet</p>
                    </div>
                    <i className="bi bi-suitcase p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">21,154</h3>{" "}
                      <p className="fs-5">Rezervimet</p>
                    </div>
                    <i className="bi bi-card-checklist p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">289</h3>{" "}
                      <p className="fs-5">Mesazhet</p>
                    </div>
                    <i className="bi bi-chat-dots p-3 fs-1"></i>
                  </div>
                </div>
              </div>

              <div className="row ">
                {/* Left Image */}
                <div className="col-xxl-6">
                  <img
                    src={chart}
                    alt="Left Product Image"
                    className="img-fluid mt-3"
                    style={{
                      height: "auto",
                      maxHeight: "372px",
                      width: "100%",
                    }}
                  />
                </div>

                {/* Right Image */}
                <div className="col-xxl-6 feedback">
                  <div className="footer-border">
                    <h2 className="feedback-h2">Feedback</h2>
                    <p className="feedback-p">
                      Admin Rating: {adminRating} stars
                    </p>
                    <p className="feedback-p">
                      Rating as Percentage: {adminRating * 20}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
