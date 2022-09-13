import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableAnalisesEmpresa from './analisesDaEmpresa';
import './ContainerAdm.css';
import TableAnalysisData from './DadosDaAnalise';
import TableListaEmpresas from './listaDeAnaliseEmpresa';
import Tableadmin from './ResquestTable.js';
import TableQuestionario from './TelaQuestionario';


function ContainerAdm() {
  const [active, setActive] = useState("FirstCard")

  return (
    <div id="body">

      <div id="admBoard">

        <div id="admPhoto">

        </div>

        <div id="nameAdmArea">
          <h6 class="nameAdm">Lucas Henrique Lindo</h6>
        </div>

        <button onClick={() => setActive("FirstCard")} class='btn'>Minha Conta</button>
        <button onClick={() => setActive("SecondCard")} class='btn'>Configurações</button>
        <button onClick={() => setActive("ThirdCard")} className='btn'>Cadastrar Analista</button>
        <button onClick={() => setActive("FourCard")} className='btn'>Ver Questionário</button>
        <button onClick={() => setActive("FiveCard")} className='btn'>Histórico de Análises</button>


      </div>

      <div className='tables'>
        {active === "FirstCard" && <Tableadmin />}
        {active === "SecondCard" && <config />}
        {active === "ThirdCard" && <cadasanal />}
        {active === "FourCard" && <TableQuestionario />}
        {active === "FiveCard" && <TableAnalysisData />}
      </div>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </div>
  );
}
export default ContainerAdm;