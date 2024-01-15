import React from "react";
import "./style.css";

import chart from "../images/chart.png";
import calendar from "../images/calendar.png";

function Dashboard() {
  return (
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
                <h3 className="fs-2">289</h3> <p className="fs-5">Mesazhet</p>
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
              style={{ height: "auto", maxHeight: "372px", width: "100%" }}
            />
          </div>

          {/* Right Image */}
          <div className="col-xxl-6">
            <img
              src={calendar}
              alt="Right Product Image"
              className="img-fluid mt-3"
              style={{ height: "auto", maxHeight: "372px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
