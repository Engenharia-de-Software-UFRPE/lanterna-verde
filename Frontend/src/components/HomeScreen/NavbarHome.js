import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css';
import './PopupLogin.css';
import { AuthContext } from '../../context/AuthContext';
import Popup from 'reactjs-popup';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavbarHome() {
  const{ loginThunk } = useContext(AuthContext);
  const [errors, setErrors] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });
  const {username, password} = formState;

  const handleInputChange = ({target}) => {
    setFormState({
      ...formState,
      [target.name]: target.value
    })
  };
  
  const errorLog = async (username, password) => {
    const response = await axios
    .post(
      'http://localhost:8000/login',
      { username: username, password: password}
    )
    .then((response) => response)
    .catch(function (error) {
      if(error.response){
        console.log(error.response.data);
        setErrors(true);
      }
    });
  };

    return(
      <>
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
                  <a class="nav-link" href="/CompanyRegistration">Cadastro</a>
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
                      <form>
                        <div>
                          <input name ='username' type="username" value={username} placeholder="Login" className="username" onChange={handleInputChange}/>
                        </div>
                        <div>
                          <input name ='password' type="password" value={password} placeholder="Senha" className="cPassword" onChange={handleInputChange}/>
                        </div>
                        <div id='buttons'>
                          <ol>
                            <div id='signin'>
                              <li>
                                <input 
                                  variant='primary' 
                                  type='submit'
                                  defaultValue="Submit now"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    loginThunk(formState.username, formState.password);
                                    errorLog(formState.username, formState.password);
                                  }}/>
                              </li>
                            </div>
                            <div id="error">{errors === true && <h5>Usuário e/ou senha inválidos</h5>}</div>
                          </ol>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </li>
              </ul> 
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      </>
    );
}

export default NavbarHome;