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

  async function handleButtonClick() {
    console.log(user);
  }
  async function handleButtonClick2() {
    console.log(analyst);
  }

  console.log(user)
  console.log(analyst)


  return (
    <>
      <Container className="cont">
        <Row class="row align-items-center">
          <Col md="auto" className="col-edit">
            <Row class="row align-items-center">
              <Col md="auto">
                <h1>Perfil de Analista</h1>
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
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control size="lg" value= {`${user.first_name} ${user.last_name} `}   />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome de usuario</Form.Label>
                <Form.Control size="lg" value={user.username} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control size="lg" value={analyst.cpf} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>E-email</Form.Label>
                <Form.Control size="lg" value={user.email} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Especialidade</Form.Label>
                <Form.Control size="lg" value={analyst.specialty} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control size="lg" type="password" value="**********" />
              </Form.Group>
              <Row class="row align-items-center">
                <Col md="auto">
                  <a href="/dataAnalystEdit" class="contact-btn">
                    Alterar Dados
                  </a>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AnalystDataScreen;
