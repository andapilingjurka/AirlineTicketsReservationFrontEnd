import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Sidebar from "./Admin/Sidebar";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
