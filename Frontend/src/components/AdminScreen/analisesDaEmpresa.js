import React, { useState, useEffect } from 'react';
import './analisesDaEmpresa.css';

const TableAnalisesEmpresa = () => {
    let listaAnalises = [
        { nomeAnalise: 'Análise x' },
        { nomeAnalise: 'Análise y' },
        { nomeAnalise: 'Análise z' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },
        { nomeAnalise: 'Análise w' },

    ];

    window.onload = () =>{
        carregaListaAnalises(listaAnalises)
    }

    function carregaListaAnalises(listaAnalises){
        const corpoDaListaAnalise = document.getElementById('listaAnalises');
        let dataHtml = '';

        for(let analise of listaAnalises){
            dataHtml += `<tr><td>${analise.nomeAnalise}</td></tr>`
        }
        corpoDaListaAnalise.innerHTML = dataHtml;
    }

    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Empresa A</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody id="listaAnalises"></tbody>
                </table>
            </div>
            <button type="button" class="btnVoltarPlistaEmpresa">Voltar</button>
        </div>
        
    </div >)
}
export default TableAnalisesEmpresa;