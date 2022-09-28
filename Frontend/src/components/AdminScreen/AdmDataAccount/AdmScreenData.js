import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './AdmScreenData.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Popup from 'reactjs-popup';

function AdmScreenData() {
    const [user, setUser] = useState("placeholder");
    const [administrator, setAdministrator] = useState("placeholder");
    const [active, setActive] = useState(false);
    // const [admPass, setAdmPass] = useState({
    //   old: '',
    //   newP: ''
    // });
    // const {old, newP} = admPass;

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

    // const handleInputChange = ({target}) => {
    //   setAdmPass({
    //     ...admPass,
    //     [target.name]: target.value
    //   })
    // }

    // const admPassword = async(old, newP) => {
    //   axios.defaults.withCredentials = true;
    //   const response = await axios
    //     .post('http://localhost:8000/user/password/change', 
    //     { 'old': old, 'newP': newP })
    //     .then(function (response) {
    //       alert(response.data);
    //       console.log(response);
    //   })
    //   .catch(function (error) {
    //     if(error.response.data){
    //       alert(error.response.data);
    //     }
    //   })
      
    // }
    async function admPassword() {
      let response = await axios
        .get("http://localhost:8000/user/password/change", { withCredentials: true })
        .then(function (response) {
          alert(response.data);
        })
        .catch(function (error) {
          if(error.response.data){
            alert(error.response.data);
          }
        });
      setUser(response.data.Usuario);
    }
  
    if (user[0] === "placeholder") {
      admPassword();
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
                
                <Popup trigger={<Row class="row align-items-center">
                      <Col md="auto">
                        <button class="contact-btn">
                          Alterar Dados
                        </button>
                      </Col>
                    </Row>}>
                    <div className='popupAdmData'>             
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
                                  // onChange={handleInputChange}
                                  // value={old}
                                />
                              </Form.Group>
                              <Form.Group className="mb">
                                <Form.Label>Nova senha</Form.Label>
                                <Form.Control
                                  type="password"
                                  size="lg"
                                  name="new"
                                  // onChange={handleInputChange}
                                  // value={newP}
                                />
                              </Form.Group>
                              <Row class="row align-items-center">
                                <Col md="auto">
                                  <div>
                                    <input
                                      className="contact-btn"
                                      type="submit"
                                      defaultValue="Atualizar Senha"
                                      // onClick={(e) => {
                                      //   e.preventDefault();
                                      //   admPassword(admPass.old, admPass.newP);
                                      // }}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Row>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </Popup>
              </Row>
            </Col>
            </Row>
        </Container>
    </>
  );
}
export default AdmScreenData;