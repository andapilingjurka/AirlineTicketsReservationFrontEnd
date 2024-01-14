import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Admin/Dashboard";
import Sidebar from "./Admin/Sidebar";
import Nav from "./Admin/Nav";
import Home from "./Admin/Home";
import Shtetet from "./Admin/ShtetiAdmin";
import Qytetet from "./Admin/QytetiAdmin";
import LoginForm from "./components/LoginRegister/LoginForm";

function App() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <Router>
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
          {toggle && <div className="col-4 col-md-2"></div>}
          <div className="col">
            <Nav Toggle={Toggle} />
            <Routes>
            <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              {/* Perdoruesit url*/}
              <Route path="/shtetet" element={<Shtetet />} />
              <Route path="/qytetet" element={<Qytetet />} />
              {/* Aeroplanet url*/}
              {/* Fluturimet url*/}
              {/* Rezervimet url*/}
              {/* Mesazhet url*/}

              {/* Logout url*/}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
