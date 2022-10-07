import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarAnalyst.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavbarAnalyst() {
  const navigate = useNavigate();
  const [logout,setLogout] = useState(false);
  const logoutBtn = async (username, password) => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      "http://localhost:8000/logout",
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response);
      navigate('/');
      localStorage.clear();
      setLogout(true);
    });
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className="navbar-brand" href="/">
          {" "}
          <img src="../images/gl.png" alt="" />
          Lanterna <b>Verde</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="col-lg my-2 ms-lg-0"
            style={{ maxHeight: "1000px" }}
            navbarScroll
          >
            <Form className="col-lg">
              <Form.Control
                type="search"
                placeholder="Busque uma empresa"
                className=""
                aria-label="Search"
              />
            </Form>
          </Nav>
          <ul class="navbar-nav ms-auto">
          <li class="nav-item">
              <a class="nav-link" href="analystProfile">
                Analises
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="dataAnalyst">
                <img src="../images/robson.jpg" alt="" />
              </a>
            </li>
            <li class="nav-item">
              {/* <a class="nav-link" href="/">
                Sair
              </a> */}
              <input type="button" value="Sair" onClick={logoutBtn}/>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAnalyst;
