import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Admin/Dashboard";
import Shtetet from "./Admin/ShtetiAdmin";
import Qytetet from "./Admin/QytetiAdmin";
import LoginForm from "./components/LoginRegister/LoginForm";
import Registration from "./components/LoginRegister/Registration";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Kontakti from "./components/Kontakti/Kontakti";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact" element={<Kontakti />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shtetet" element={<Shtetet />} />
        <Route path="/qytetet" element={<Qytetet />} />
      </Routes>
    </Router>
  );
}

export default App;
