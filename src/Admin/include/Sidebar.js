import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../style.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-3">Airline</span>
        <i className="bi bi-airplane-fill fs-2 me-3 ms-2"></i>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className={`list-group-item py-2 ${
            location.pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-bar-chart-line fs-5 me-3"></i>{" "}
          <span>Dashboard</span>
        </Link>

        <Link
          to="/"
          className={`list-group-item py-2 ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-house fs-5 me-3"></i> <span>Home</span>
        </Link>

        <Link
          to="/perdoruesit"
          className={`list-group-item py-2 ${
            location.pathname === "/perdoruesit" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-people fs-5 me-3"></i> <span>Perdoruesit</span>
        </Link>

        <Link
          to="/shtetet"
          className={`list-group-item py-2 ${
            location.pathname === "/shtetet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-geo-alt fs-5 me-3"></i> <span>Shtetet</span>
        </Link>

        <Link
          to="/qytetet"
          className={`list-group-item py-2 ${
            location.pathname === "/qytetet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-buildings fs-5 me-3"></i> <span>Qytetet</span>
        </Link>

        <Link
          to="/aeroplanet"
          className={`list-group-item py-2 ${
            location.pathname === "/aeroplanet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-airplane fs-5 me-3"></i> <span>Aeroplanet</span>
        </Link>

        <Link
          to="/fluturimet"
          className={`list-group-item py-2 ${
            location.pathname === "/fluturimet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-suitcase fs-5 me-3"></i> <span>Fluturimet</span>
        </Link>

        <Link
          to="/rezervimet"
          className={`list-group-item py-2 ${
            location.pathname === "/rezervimet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-card-checklist fs-5 me-3"></i>
          <span>Rezervimet</span>
        </Link>

        <Link
          to="/kontaktet"
          className={`list-group-item py-2 ${
            location.pathname === "/kontaktet" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-chat-dots fs-5 me-3"></i> <span>Mesazhet</span>
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;
