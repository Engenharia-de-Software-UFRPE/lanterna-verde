import React, { useState, useEffect } from 'react';
import './listaDeAnaliseEmpresa.css';

const TableListaEmpresas = () => {
    let listaEmpresas = [
        { nomeEmpresa: 'Empresa A' },
        { nomeEmpresa: 'Empresa B' },
        { nomeEmpresa: 'Empresa C' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
        { nomeEmpresa: 'Empresa D' },
    ];

    window.onload = () =>{
        carregaListaEmpresas(listaEmpresas)
    }

    function carregaListaEmpresas(listaEmpresas){
        const corpoDaLista = document.getElementById('listaEmpresas');
        let dataHtml = '';

        for(let empresa of listaEmpresas){
            dataHtml += `<tr><td><a href = "#">${empresa.nomeEmpresa}</a></td></tr>`
        }
        corpoDaLista.innerHTML = dataHtml;
    }

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
export default TableListaEmpresas;