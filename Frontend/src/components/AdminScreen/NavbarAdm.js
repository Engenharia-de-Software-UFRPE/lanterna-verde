import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarAdm.css';
import Popup from 'reactjs-popup';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

function NavbarAdm() {
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
  // const handleLogout = e => {
  //   e.preventDefault(); // VERIFICAR O 'LOGOUT' DEPOIS 
  //   fetch('http://localhost:8000/user', { 
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${localStorage.getItem('token')}`
  //     }
  //   })
  //   .then((response) => {response.json()
  //     console.log(response);
  //     localStorage.clear();
  //     navigate('/');
  //   });
  // };

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
                className="col-11 my-e ms-lg-0"
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
                <li>
                  <Popup trigger={
                    <a id="notificationMenuButton" className="notification-link">
                    <span className="notification">
                      <span className="notification-icon"></span>
                    </span>
                    </a>}>
                    <div className='popupBell'>
                      <h3>Notificações</h3>
                      <h6>No notifications</h6>
                    </div>
                  </Popup>
                </li>
                <li class="nav-item">
                <input type="button" value="Sair" onClick={logoutBtn}/>
                </li>
                <li class="nav-item">
                
                </li>
              </ul> 
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavbarAdm;