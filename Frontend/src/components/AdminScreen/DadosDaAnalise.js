import React, { useState, useEffect } from 'react';
import './DadosDaAnalise.css';

const TableAnalysisData = () => {
    let analysisData = [
        {nomeAnalsita: 'July', nomeEmpresa: 'Empresa A', score: '80%', comentarios: 'A empresa foi muito bem nos casos A, B e C. Porém perdeu pontuações devido ao fato de ter feito isso e aquilo.'}
    ];

    window.onload = () =>{
        carregaDadosDaAnalise(analysisData);
    }

    function carregaDadosDaAnalise(analysisData){
        const corpoDadosAnalise = document.getElementById('analysisData');
        let dataHtml = '';

        for(let data of analysisData){
            dataHtml += `<tr><td>${data.nomeAnalsita}</td> <td>${data.nomeEmpresa}</td> <td>${data.score}</td> <td>${data.comentarios}</td> </tr>`
        }
        corpoDadosAnalise.innerHTML = dataHtml;
    }

    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Informações sobre a análise feita:</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Analista</th>
                            <th>Empresa</th>
                            <th>Score</th>
                            <th>Comentários</th>
                        </tr>
                    </thead>
                    <tbody id="analysisData"></tbody>
                </table>
            </div>
        </div>
        
    </div >)
}
export default TableAnalysisData;