import React, { useState, useEffect } from 'react';
import './TelaQuestionario.css';

const TableQuestionario = () => {
    let listaDePerguntas = [
        { dimensao: 'D1', nomePergunta: 'Does the claim suggest that the product or service is green based on a narrow set of attributes without attention to other environmental issues?' },
        { dimensao: 'D1', nomePergunta: 'Cannot the claim be sustained by easily accessible supporting information or by reliable third-party certification?' },
        { dimensao: 'D1', nomePergunta: 'Is the claim too broad, lacking in specifics, with terms like "all-natural", "non-toxic", "environmentally friendly", "eco-friendly", or "eco-conscious" poorly defined?' },
        { dimensao: 'D1', nomePergunta: 'Does the claim apply a false suggestion or certification-like image that misleads consumers into a legitimate green certification process?' },
        { dimensao: 'D1', nomePergunta: 'Is the claim relevant in the contex? Is unimportant or unhelpful, in a way that its obvious because exists a regulation from the authorities?' },
        { dimensao: 'D1', nomePergunta: 'Does the claim risk distracting the consumer from the greater environmental impacts of the category as a whole, even if it may be true within the product category?' },
        { dimensao: 'D1', nomePergunta: 'Is the claim false or untrue?' },
        { dimensao: 'D2', nomePergunta: 'Does the product environmental communication suggest nature-evoking elements such as images using colors (e.g. green, blue), nature landscapes (e.g. mountains, forests, oceans)?' },
        { dimensao: 'D2', nomePergunta: 'Does the product environmental communication suggest nature-evoking elements such as images using pictures of endangered species (e.g. pandas, dolphins) or renewable sources of energy (wind, sun)?' },
        { dimensao: 'D2', nomePergunta: 'Does the product environmental communication suggest nature-evoking elements such as sounds (e.g. sea, birds)?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim belong to an inherently unsustainable business, promoting sustainable practices that are not representative neither for the business or the society?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim divert attention from sustainable issues, through the use of exaggerated achievements or present alternative programs that are not related to the main sustainability concern?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim try to influence regulations or governments in order to obtain benefits that affect sustainability due to the companies character of large taxpayers or employers?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim sustain environmental accomplishments or commitments that are already required by existing laws or regulations?' },
        { dimensao: 'D3', nomePergunta: 'Does the company take advantage of sustainability reports and their nature of one-way communication channel, in order to twist the truth or project a positive image in terms of CSR practices?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim reinforce a false hope?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim fabricate a treat or insecurity related to "not buying in" on an organization practice?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim make a broken promise, guaranteeing that an organization practice will provide economic development to the community?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim does not speak directly to the communities most affected by its practices?' },
        { dimensao: 'D3', nomePergunta: 'Does the claim distracts the public from the dangers caused by hazardous consequences of its practices?' },
        { dimensao: 'D4', nomePergunta: 'Does the company environmental communication suggest nature-evoking elements such as images using colors (e.g. green, blue), nature landscapes (e.g. mountains, forests, oceans)?' },
        { dimensao: 'D4', nomePergunta: 'Does the company environmental communication suggest nature-evoking elements such as images using pictures of endangered species (e.g. pandas, dolphins) or renewable sources of energy (wind, sun)?' },
        { dimensao: 'D4', nomePergunta: 'Does the company environmental communication suggest nature-evoking elements such as sounds (e.g. sea, birds)?' },

    ];

    window.onload = () =>{
        carregaListaPerguntas(listaDePerguntas)
    }

    function carregaListaPerguntas(listaDePerguntas){
        const corpoDaListaPerguntas = document.getElementById('listaDePerguntas');
        let dataHtml = '';

        for(let pergunta of listaDePerguntas){
            dataHtml += `<tr><td>${pergunta.dimensao}</td><td>${pergunta.nomePergunta}</td></tr>`
        }
        corpoDaListaPerguntas.innerHTML = dataHtml;
    }

    return (<div id="requestListArea" className='requestListArea'>
        <h6 class="requestList"><strong>Dimensão | Pergunta</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody id="listaDePerguntas"></tbody>
                </table>
            </div>
            <button type="button" class="btnVoltarPtelaPrincipal">Voltar</button>
        </div>
        
    </div >)
}
export default TableQuestionario;