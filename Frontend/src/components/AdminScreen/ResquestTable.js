import React, { useState, useEffect } from 'react';
import './ContainerAdm.css';

const Tableadmin = () => {

    let companyData = [
        { companyAnalysis: 'Análise da empresa A' },
        { companyAnalysis: 'Análise da empresa B' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa D' },
        { companyAnalysis: 'Análise da empresa E' },
        { companyAnalysis: 'Análise da empresa F' },
        { companyAnalysis: 'Análise da empresa G' },
        { companyAnalysis: 'Análise da empresa H' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' },
        { companyAnalysis: 'Análise da empresa C' }
    ];

    window.onload = () => {
        loadTableData(companyData);
    }

    function loadTableData(companyData) {
        const tableBody = document.getElementById('tableData');
        let dataHtml = '';

        for (let company of companyData) {
            dataHtml += `<tr><td>${company.companyAnalysis}</td></tr>`;
        }
        tableBody.innerHTML = dataHtml;
    }

    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Solicitações de Análise</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody id="tableData"></tbody>
                </table>
            </div>
        </div>
    </div >)
}

export default Tableadmin;