import React, { useState }from 'react';
import CompanyAnalysis from './CompanyAnalysis';
import './AnalysisTableList.css';
import CompanyAnalysisMap from './CompanyAnalysisMap';
import axios from 'axios';


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


    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Análises da empresa selecionada</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody> 
                    <CompanyAnalysisMap analisesEmpresa ={analysisList} />
                    </tbody>
                </table>
            </div>
            <button type="button" class="btnVoltarPlistaEmpresa">Voltar</button>
        </div>
    </div >)
}
export default AnalysisTableList;