import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AnalystDataScreenEdit.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom';

function AnalystDataScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(["placeholder"]);
  const [analyst, setAnalyst] = useState(["placeholder"]);

  async function listAnalysis() {
    let response = await axios
      .get("http://localhost:8000/user/analista", { withCredentials: true })
      .then((response) => response);
    setAnalyst(response.data.Analista);
    setUser(response.data.Usuario);
    setData({
      username: response.data.Usuario.username,
    first_name: response.data.Usuario.first_name,
    last_name: response.data.Usuario.last_name,
    email:  response.data.Usuario.email,
    cpf: response.data.Analista.cpf,
    specialty: response.data.Analista.specialty
    });

    
  }



  if (analyst[0] === "placeholder") {
    listAnalysis();
  }
  if (user[0] === "placeholder") {
    listAnalysis();
  }

  const[data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    cpf: "",
    specialty: ""


  }
  );
 

  async function passwordUser() {
    let response = await axios
      .get("http://localhost:8000/user/password/change", { withCredentials: true })
      .then((response) => response);
    setUser(response.data.Usuario);
  }

  if (user[0] === "placeholder") {
    passwordUser();
    
  }

  const userChange = async(username, first_name, last_name, email, cpf, specialty) =>{
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      'http://localhost:8000/analista/update',
      {'username': username, 'first_name': first_name, 'last_name': last_name, 'email': email, 'cpf': cpf, 'specialty': specialty,})
      .then(async function(response){
        alert("Dados alterados com sucesso!");
        console.log(response);
       // await axios.post('http://localhost:8000/logout').then(navigate("/"))
      }
    )

    
  }



  const passwordChange = async(oldPassword,newPassword) => {
    axios.defaults.withCredentials = true;

  
    const response = await axios.post(
        'http://localhost:8000/user/password/change', 
     {'newpw': newPassword, 'oldpw': oldPassword})
    .then(async function (response) {
        alert("Senha Alterada com Sucesso!");
        console.log(response);
       // await axios.post('http://localhost:8000/logout').then(navigate("/"))

    })
    .catch(function (error) {
        if(error.response.data){
            alert("Antiga Senha incorreta, por favor tente novamente");
        }
    })
};
 

  const {username, first_name,last_name,email,cpf,specialty} = data;
    const handleInputChange2 = ({target}) => {
          setData({
            ...data,
            [target.name]: target.value
        })
    };



  const[passwords, setPasswords] = useState({
    oldpw: "",
    newpw: ""
  }
  );
  const {oldpw, newpw} = passwords;
    const handleInputChange = ({target}) => {
          setPasswords({
            ...passwords,
            [target.name]: target.value
        })
    };
 

 
  return (
    <>
    <div className="container">
      <form >
        <Container className="cont">
          <Row class="row align-items-center">
            <Col md="auto" className="col-edit">
              <Row class="row align-items-center">
                <Col md="auto">
                  <h1>Editar Perfil</h1>
                </Col>
              </Row>
              <Row class="row align-items-center">
                <Col md="auto">
                  <div class="pic">
                    <img src="../images/robson.jpg" alt="" />
                  </div>
                </Col>
              </Row>

              <Row md="">
                <Form.Group className="mb-3">
                  <Form.Label>Primeiro nome</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.first_name}
                    name="first_name"
                    onChange={handleInputChange2}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.last_name}
                    name="last_name"
                    onChange={handleInputChange2}

                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nome de usuario</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.username}
                    name="username"
                    onChange={handleInputChange2}

                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={analyst.cpf}
                    name="cpf"
                    onChange={handleInputChange2}

                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.email}
                    name="email"
                    onChange={handleInputChange2}

                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidade</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={analyst.specialty}
                    name="specialty"
                    onChange={handleInputChange2}

                  />
                </Form.Group>
                <Row class="row align-items-center">
                  <Col md="auto">
                    <div>
                      <input
                        className="contact-btn"
                        type="submit"
                        defaultValue="Atualizar Dados"
                        onClick={
                          (e) => {
                              e.preventDefault();
                              userChange(data.username, data.first_name,data.last_name,data.email,data.cpf,data.specialty);
                            }}
                      />
                    </div>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Container>
      </form>

      <form>
        
          <Row class="row align-items-center">
            <Col className="col-edit">
              <Row class="row align-items-center">
                <Col md="auto">
                  <h1>Editar Senha</h1>
                </Col>
              </Row>
              <Row md="">
                <Form.Group className="mb">
                  <Form.Label>Senha antiga</Form.Label>
                  <Form.Control
                    type="password"
                    size="lg"
                    name="oldpw"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb">
                  <Form.Label>Nova senha</Form.Label>
                  <Form.Control
                    type="password"
                    size="lg"
                    name="newpw"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row class="row align-items-center">
                  <Col md="auto">
                    <div>
                      <input
                        className="contact-btn"
                        type="submit"
                        defaultValue="Atualizar Senha"
                        onClick={
                          (e) => {
                              e.preventDefault();
                              passwordChange(passwords.oldpw, passwords.newpw);
                             
                      }}
                      />
                    </div>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
      </form>
      </div>
    </>
  );
}

export default AnalystDataScreen;
