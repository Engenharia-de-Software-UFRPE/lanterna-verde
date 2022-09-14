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
    window.onclick = () => {
        loadTableData(companyData);
    }
    window.onload = () => {
        loadTableData(companyData);
    }

    function loadTableData(companyData) {
        const tableBody = document.getElementById('tbody');
        let dataHtml = '';

        for (let company of companyData) {
            dataHtml += `<tr><td> <a href = "">${company.companyAnalysis}</a></td></tr>`;
        }
        tableBody.innerHTML = dataHtml;
    }



    return (
        <div className='tabela'>
            <h1>Solicitações de analises</h1>
            <table>
                <tbody id='tbody'>
                </tbody>
            </table>
        </div >

    )
}

export default Tableadmin;