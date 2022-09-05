import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarHome.css';
import './PopupLogin.css';
import { AuthContext } from '../../context/AuthContext';

import Popup from 'reactjs-popup';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavbarHome() {
  const{ loginThunk } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const {username, password} = formState;
  const handleInputChange = ({target}) => {
    setFormState({
      ...formState,
      [target.name]: target.value
    })
  }

  {/*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() =>{
      if(localStorage.getItem('token') !== null){
        window.location.replace('http://localhost:3000/Admin');
      } 
    }, []);

    const onSubmit = e => {
      
      const user = {
        username: username,
        password: password
      };
  
      fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          if(data.key){
            localStorage.clear();
            localStorage.setItem('token', data.key);
            window.location.replace('http://localhost:3000/Admin');
          }
        });
    };*/}


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
                      {/*<form action="http://localhost:8000/login" method='post'>*/}
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
                              <li> {/*<Link
                                to='/Admin'
                                >
                                <a href="#">Entrar</a>
                                </Link>*/}
                                <input 
                                  variant='primary' 
                                  type='submit' 
                                  defaultValue="Submit now" 
                                  onClick={(e) => {
                                    e.preventDefault()
                                    loginThunk(formState.username, formState.password)
                                      .then(() => {
                                        navigate.push('/Admin')
                                      })
                                  }}/>
                              </li>
                            </div>
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