import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import CompanyAnalysis from './CompanyAnalysis';
import './AnalysisTableList.css';
import CompanyAnalysisMap from './CompanyAnalysisMap';
import axios from 'axios';
import InfoAnalysis from './InfoAnalysis';


const AnalysisTableList = () => {
    
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
     
      <div id="requestListArea">
      <ListGroup.Item>
        <h6 class="requestList"><strong>Análises da empresa selecionada</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody> 
                    <CompanyAnalysisMap analisesEmpresa ={analysisList} />
                    <button onClick={detailsHandler} class='btn'> Abrir análise</button>
                    </tbody>
                </table>
            </div>
            {active ? <InfoAnalysis/> : ''}
        </div>
        </ListGroup.Item>
    </div >
    )
};
export default AnalysisTableList;
