import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import CompanyAnalysis from './CompanyAnalysis';
import './AnalysisTableList.css';
import CompanyAnalysisMap from './CompanyAnalysisMap';
import axios from 'axios';
import InfoAnalysis from './InfoAnalysis';

const AnalysisTableList = ({analisesEmpresa}) => {
    
    const [analysisList,setAnalysisList] = useState(['placeholder']);

    async function AnalysisList() {
      let response = await axios.get(
        "http://localhost:8000/analise",
        { withCredentials: true }
      )
      .then(response => response)
      setAnalysisList(response.data.analisesEmpresa)
    }

    if (analysisList[0] === "placeholder") {
        AnalysisList();
      }

      const [active, setActive] = useState(false);

    const detailsHandler = () => {
        setActive((prevState) => !prevState);
    }


    return (
        <> 
          <ListGroup.Item
              as="li"
              className="bg-success d-flex justify-content-between align-items-start"
              >
          <div className='ms-2 me-auto'>
              <div className="fw-bold">
                Analises: {analisesEmpresa}
                <button onClick={detailsHandler} class='btn'> Ver relatório</button>
              </div>
          </div>
          </ListGroup.Item>
          {active ? <InfoAnalysis/> : ''}
        </>
    )
};
export default AnalysisTableList;
