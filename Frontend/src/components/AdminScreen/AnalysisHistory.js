import React, { useState, useEffect } from 'react';
import './AnalysisHistory.css';

const AnalysisHistory = () => {
    
{/*Selecionar a empresa para ver suas análises*/}
    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Selecione a empresa que deseja ver o histórico de análises</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody id="listaEmpresas"></tbody>
                </table>
            </div>
            <button type="button" class="btnVoltarPlistaEmpresa">Voltar</button>
        </div>
    </div >)
}
export default AnalysisHistory;