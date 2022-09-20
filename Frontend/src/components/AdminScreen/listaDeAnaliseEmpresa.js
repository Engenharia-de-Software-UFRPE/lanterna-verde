import React, { useState, useEffect } from 'react';
import CompanyAnalysis from './CompanyAnalysis';
import './listaDeAnaliseEmpresa.css';
import CompanyAnalysisMap from './CompanyAnalysisMap';


const AnalysisTableList = () => {
    

    return (<div id="requestListArea">
        <h6 class="requestList"></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody> 
                    <CompanyAnalysisMap analisesEmpresa ={CompanyAnalysis} />
                    </tbody>
                </table>
            </div>
            <button type="button" class="btnVoltarPlistaEmpresa">Voltar</button>
        </div>
    </div >)
}
export default AnalysisTableList;