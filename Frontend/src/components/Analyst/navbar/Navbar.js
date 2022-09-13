import React, { useState, useEffect } from 'react';
import './Navbar.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"> <img src="../images/gl.png" alt=""/>Lanterna <b>Verde</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="col-lg my-2 ms-lg-0"
            style={{ maxHeight: '1000px' }}
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
                <a class="nav-link" href="AnalystRegistration">Cadastro</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="AnalystLogin">Login</a>
            </li>
        </ul>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;


