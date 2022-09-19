import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AnalystProfileContainer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import AnalysisMap from "../analysis/AnalysisMap.js";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function AnalystProfileContainer() {

  const navigate = useNavigate();
  const [analysis,setAnalysis] = useState(['placeholder']);

    //[
    //   {
    //     empresa: "Empresa 1",
    //     score: 2.4,
    //     finalizada: false,
    //   },
    //   {
    //     empresa: "Empresa 2",
    //     score: 1.1,
    //     finalizada: false,
    //   },
    //   {
    //     empresa: "Empresa 3",
    //     score: 0.1,
    //     finalizada: false,
    //   },
    // ]);

  
  async function listAnalysis() {
    let response = await axios.get(
      "http://localhost:8000/analise",
      { withCredentials: true },
    )
    .then(response => response)
    setAnalysis(response.data.Analise)


    // if (response.status !== 201) {
    //   navigate("/")
    // }
    
  }
  console.log(analysis);
  if (analysis[0] === 'placeholder'){
    listAnalysis()
  }

  async function handleButtonClick() {
    console.log(analysis)
  }

  

  console.log(analysis)
  return (
    <>
      
      <body>
        <div class="container-fluid">
          <Row className="auto">
            <Col md="auto">
              <h2>Serviços do Analista</h2>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col>
              <ListGroup as="ol" numbered>
                <Row className="auto">
                  <Col md="auto">
                    <h4>Analises Pendentes</h4>
                  </Col>
                </Row>
                {/* {analysis.map((item) => (
                  <li>ola</li>
                ))} */}
                <AnalysisMap analises ={analysis} boolean =  {0} />
              </ListGroup>
            </Col>
            <Col>
              <ListGroup as="ol" numbered>
                <Row className="auto">
                  <Col md="auto">
                    <h4>Em Andamento</h4>
                  </Col>
                </Row>
                {/* {analysis.map((item) => (
                  <li>ola</li>
                ))} */}
                <AnalysisMap analises ={analysis} boolean =  {1} />
              </ListGroup>
            </Col>
            <Col>
              <ListGroup as="ol" numbered>
              <Row className="auto">
                  <Col md="auto">
                    <h4>Analises Finalizadas</h4>
                  </Col>
                </Row>
                <AnalysisMap analises={analysis} boolean ={2}/>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </body>
    </>
  );
}

export default AnalystProfileContainer;
