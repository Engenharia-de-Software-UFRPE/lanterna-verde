import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './AdmScreenData.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function AdmScreenData() {
    const [user, setUser] = useState(["placeholder"]);
    const [administrator, setAdministrator] = useState("placeholder");
    const [active, setActive] = useState(false);

    const detailsHandler = () => {
      setActive((prevState) => !prevState);
    }

    async function getAdministratorData() {
      axios.defaults.withCredentials = true;
      let response = await axios
        .get("http://localhost:8000/user/admin", { withCredentials: true })
        .then((response) => response);
      setAdministrator(response.data.Administrador);
      setUser(response.data.Usuario);
    }
  
    if (administrator === "placeholder") {
      getAdministratorData();
    }
    if (user === "placeholder") {
      getAdministratorData();
    }
  
    return (
      <>
        <Container className="contAdmData">
          <Row class="row align-items-center">
            <Col md="auto" className="col-edit">

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
                    <Form.Label>E-email</Form.Label>
                    <Form.Control size="lg" value={user.email} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control size="lg" type="password" value="**********" />
                </Form.Group>
              </Row>
            </Col>
            </Row>
        </Container>
    </>
  );
}
export default AdmScreenData;