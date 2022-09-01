import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css';
import './PopupLogin.css';

import Popup from 'reactjs-popup';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavbarHome() {
    

    return(
      <div class="position-fixed col-12">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/"> <img src="../images/gl.png" alt=""/>Lanterna <b>Verde</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"> 
              <span class="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="col-lg my-e ms-lg-0"
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
                  <a class="nav-link" href="">Cadastro</a>
                </li>
                <li class="nav-item">
                  <Popup trigger={<a class="nav-link" href="#">Login</a>}>
                    <div className='popup'>  
                      <Link
                        to='/'
                        >
                        <Popup trigger={<a href="" id='x-btn'><strong>X</strong></a>}/>
                      </Link>            
                      <img src="../images/tick.png" alt="" />
                      <h2>Faça seu login</h2>
                      <p>Por favor digite seu login e senha.</p>
                      <div>
                        <input type="username" placeholder="Login" className="username" name ='username'/>
                      </div>
                      <div>
                        <input type="password" placeholder="Senha" className="cPassword" />
                      </div>
                      <div id='buttons'>
                        <ol>
                          <div id='signin'>
                            <li> <Link
                              to='/Admin'
                              >
                              <a href="#">Entrar</a>
                              </Link>
                            </li>
                          </div>
                        </ol>
                      </div>
                    </div>
                  </Popup>
                </li>
              </ul> 
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavbarHome;