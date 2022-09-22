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

    // if (response.status !== 201) {
    //   navigate("/")
    // }
  }

  if (analyst[0] === "placeholder") {
    listAnalysis();
  }
  if (user[0] === "placeholder") {
    listAnalysis();
  }


  async function passwordUser() {
    let response = await axios
      .get("http://localhost:8000/user/password/change", { withCredentials: true })
      .then((response) => response);
    setUser(response.data.Usuario);
  }

  if (user[0] === "placeholder") {
    passwordUser();
  }

 

 
  return (
    <>
    <div className="container">
      <form action="http://localhost:8000/analista/update" method="post">
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
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.last_name}
                    name="last_name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nome de usuario</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.username}
                    name="username"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={analyst.cpf}
                    name="cpf"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={user.email}
                    name="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidade</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={analyst.specialty}
                    name="specialty"
                  />
                </Form.Group>
                <Row class="row align-items-center">
                  <Col md="auto">
                    <div>
                      <input
                        className="contact-btn"
                        type="submit"
                        defaultValue="Atualizar Dados"
                      />
                    </div>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Container>
      </form>

      <form action="http://localhost:8000/user/password/change" method="post">
        
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
                    name="old"
                  />
                </Form.Group>
                <Form.Group className="mb">
                  <Form.Label>Nova senha</Form.Label>
                  <Form.Control
                    type="password"
                    size="lg"
                    name="new"
                  />
                </Form.Group>
                <Row class="row align-items-center">
                  <Col md="auto">
                    <div>
                      <input
                        className="contact-btn"
                        type="submit"
                        defaultValue="Atualizar Senha"
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
