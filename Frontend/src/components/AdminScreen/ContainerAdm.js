import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableAnalisesEmpresa from './analisesDaEmpresa';
import './ContainerAdm.css';
import TableAnalysisData from './DadosDaAnalise';
import TableListaEmpresas from './listaDeAnaliseEmpresa';
import Tableadmin from './ResquestTable.js';
import TableQuestionario from './TelaQuestionario';


function ContainerAdm() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [minhaConta, setConta] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(false);
  const [cadastrarAnalista, setAnalista] = useState(false);
  const [verQuestionario, setQuestionario] = useState(false);
  const [historicoAnalises, setHistorico] = useState(false);

  const mContaHandler = () => {
    if (configuracoes == true) {
      setConfiguracoes((prevState) => !prevState);
    }
    if (cadastrarAnalista == true) {
      setAnalista((prevState) => !prevState);
    }
    if (verQuestionario == true) {
      setQuestionario((prevState) => !prevState);
    }
    if (historicoAnalises == true) {
      setHistorico((prevState) => !prevState);
    }
    setConta((prevState) => !prevState);
  }
  const configuracoesHandler = () => {
    if (minhaConta == true) {
      setConta((prevState) => !prevState);
    }
    if (cadastrarAnalista == true) {
      setAnalista((prevState) => !prevState);
    }
    if (verQuestionario == true) {
      setQuestionario((prevState) => !prevState);
    }
    if (historicoAnalises == true) {
      setHistorico((prevState) => !prevState);
    }
    setConfiguracoes((prevState) => !prevState);
  }
  const cAnalistaHandler = () => {
    if (minhaConta == true) {
      setConta((prevState) => !prevState);
    }
    if (configuracoes == true) {
      setConfiguracoes((prevState) => !prevState);
    }
    if (verQuestionario == true) {
      setQuestionario((prevState) => !prevState);
    }
    if (historicoAnalises == true) {
      setHistorico((prevState) => !prevState);
    }
    setAnalista((prevState) => !prevState);
  }
  const vQuestionarioHandler = () => {
    if (minhaConta == true) {
      setConta((prevState) => !prevState);
    }
    if (configuracoes == true) {
      setConfiguracoes((prevState) => !prevState);
    }
    if (cadastrarAnalista == true) {
      setAnalista((prevState) => !prevState);
    }
    if (historicoAnalises == true) {
      setHistorico((prevState) => !prevState);
    }
    setQuestionario((prevState) => !prevState);
  }
  const hAnalisesHandler = () => {
    if (minhaConta == true) {
      setConta((prevState) => !prevState);
    }
    if (configuracoes == true) {
      setConfiguracoes((prevState) => !prevState);
    }
    if (cadastrarAnalista == true) {
      setAnalista((prevState) => !prevState);
    }
    if (verQuestionario == true) {
      setQuestionario((prevState) => !prevState);
    }
    setHistorico((prevState) => !prevState);
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <div id="body">

      <div id="admBoard">

        <div id="admPhoto">

        </div>

        <div id="nameAdmArea">
          <h6 class="nameAdm">Lucas Henrique Lindo</h6>
        </div>

        <button onClick={mContaHandler} type="button" class='btn'>Minha Conta</button>
        <button onClick={configuracoesHandler} type="button" class='btn'>Configurações</button>
        <button onClick={cAnalistaHandler} type="button" className='btn'>Cadastrar Analista</button>
        <button onClick={vQuestionarioHandler} type="button" className='btn'>Ver Questionário</button>
        <button onClick={hAnalisesHandler} type="button" className='btn'>Histórico de Análises</button>


      </div>

      <div className='tableBody'>
        {verQuestionario ? <TableQuestionario></TableQuestionario> : <Tableadmin></Tableadmin>}
        {/* {historicoAnalises ? <TableListaEmpresas></TableListaEmpresas> : <Tableadmin></Tableadmin>} */}
      </div>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </div>
  );
}
export default ContainerAdm;