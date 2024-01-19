import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Kontakti.css";
import sjuardese from "./sjuardese.jpg";

import MyNavbar from "../include/Navbar";
import Footer from "../include/Footer";

function Kontakti() {
  const [id, setKontaktID] = useState("");
  const [emri, setEmri] = useState("");
  const [emaili, setEmaili] = useState("");
  const [mesazhi, setMesazhi] = useState("");
  const [kontakts, setUsers] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7054/api/Kontakt/GetAllList"
      );
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7054/api/Kontakt/Add", {
        id: id,
        emri: emri,
        emaili: emaili,
        mesazhi: mesazhi,
      });
      alert("Save successful!");
      setKontaktID("");
      setEmri("");
      setEmaili("");
      setMesazhi("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <MyNavbar />
      <Container fluid className="container-full">
        <Row className="justify-content-end">
          <Col md={6} lg={6} className="pb-5">
            <div className="featured-image mb-3">
              <img src={sjuardese} className="img-fluid" alt="Featured" />
            </div>
          </Col>
          <Col md={8} lg={6} className="pb-5 ml-auto">
            <form onSubmit={save}>
              <div className="card-header p-0">
                <div className="bg-info text-white text-center py-2">
                  <h3>
                    <i className="fa fa-envelope"></i> Na Kontaktoni
                  </h3>
                  <p className="m-0">Ne jemi të lumtur të ju ndihmojmë!</p>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-user text-info"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      hidden
                      value={id}
                      onChange={(event) => {
                        setKontaktID(event.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Emri"
                      value={emri}
                      onChange={(e) => setEmri(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-envelope text-info"></i>
                      </div>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={emaili}
                      onChange={(e) => setEmaili(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-comment text-info"></i>
                      </div>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Dërgoni Mesazhin Tuaj"
                      value={mesazhi}
                      onChange={(e) => setMesazhi(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn btn-info btn-block rounded-0 py-2"
                  >
                    Send
                  </Button>
                </div>
              </div>
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
                integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
                crossOrigin="anonymous"
              />
            </form>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default Kontakti;
