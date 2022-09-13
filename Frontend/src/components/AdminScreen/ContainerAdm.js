import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableAnalisesEmpresa from './analisesDaEmpresa';
import './ContainerAdm.css';
import TableAnalysisData from './DadosDaAnalise';
import TableListaEmpresas from './listaDeAnaliseEmpresa';
import Tableadmin from './ResquestTable.js';
import TableQuestionario from './TelaQuestionario';
import axios from 'axios';


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

  const [user, setUser] = useState(["placeholder"]);
  const [administrator, setAdministrator] = useState(["placeholder"]);

  async function listAnalysis() {
    let response = await axios
      .get("http://localhost:8000/user/admin", { withCredentials: true })
      .then((response) => response);
      setAdministrator(response.data.Administrador);
      setUser(response.data.Usuario);
  }

  if (administrator[0] === "placeholder") {
    listAnalysis();
  }
  if (user[0] === "placeholder") {
    listAnalysis();
  }
  

  const mContaHandler = () => {
    if(configuracoes == true){
      setConfiguracoes((prevState) => !prevState);
    }
    if(cadastrarAnalista == true){
      setAnalista((prevState) => !prevState);
    }
    if(verQuestionario == true){
      setQuestionario((prevState) => !prevState);
    }
    if(historicoAnalises == true){
      setHistorico((prevState) => !prevState);
    }
    setConta((prevState) => !prevState);
  }
  const configuracoesHandler = () => {
    if(minhaConta == true){
      setConta((prevState) => !prevState);
    }
    if(cadastrarAnalista == true){
      setAnalista((prevState) => !prevState);
    }
    if(verQuestionario == true){
      setQuestionario((prevState) => !prevState);
    }
    if(historicoAnalises == true){
      setHistorico((prevState) => !prevState);
    }
    setConfiguracoes((prevState) => !prevState);
  }
  const cAnalistaHandler = () => {
    if(minhaConta == true){
      setConta((prevState) => !prevState);
    }
    if(configuracoes == true){
      setConfiguracoes((prevState) => !prevState);
    }
    if(verQuestionario == true){
      setQuestionario((prevState) => !prevState);
    }
    if(historicoAnalises == true){
      setHistorico((prevState) => !prevState);
    }
    setAnalista((prevState) => !prevState);
  }
  const vQuestionarioHandler = () => {
    if(minhaConta == true){
      setConta((prevState) => !prevState);
    }
    if(configuracoes == true){
      setConfiguracoes((prevState) => !prevState);
    }
    if(cadastrarAnalista == true){
      setAnalista((prevState) => !prevState);
    }
    if(historicoAnalises == true){
      setHistorico((prevState) => !prevState);
    }
    setQuestionario((prevState) => !prevState);
  }
  const hAnalisesHandler = () => {
    if(minhaConta == true){
      setConta((prevState) => !prevState);
    }
    if(configuracoes == true){
      setConfiguracoes((prevState) => !prevState);
    }
    if(cadastrarAnalista == true){
      setAnalista((prevState) => !prevState);
    }
    if(verQuestionario == true){
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
  console.log(user.username);
  console.log(user);
  console.log(administrator);
  return (
    <>
      <div id="admBoard">

        <div id="admPhoto">
          <img src="../images/testeprojeto.png" alt="" class="photo" />
        </div>

        <div id="nameAdmArea">
          <h6 class="nameAdmTitle">Nome:</h6>
          <h6 class="nameAdm">Nome do administrador</h6>
        </div>
        <div id="usernameAdmArea">
          <h6 class="usernameAdmTitle">Username:</h6>
          <h6 class="usernameAdm">{user.username}</h6>
        </div>

        <button onClick={mContaHandler} type="button" class='btnMinhaConta'>Minha Conta</button>
        <button onClick={configuracoesHandler} type="button" class='btnConfiguracoes'>Configurações</button>
        <button onClick={cAnalistaHandler} type="button" className='btnCadastrarAnalista'><a href="analystRegistration">Cadastrar Analista</a></button>
        <button onClick={vQuestionarioHandler} type="button" className='btnQuestionario'>Ver Questionário</button>
        <button onClick={hAnalisesHandler} type="button" className='btnHistoricoDeAnalises'>Histórico de Análises</button>
      </div>


      {/*{minhaConta ? 'historico' : <Tableadmin></Tableadmin>}
      {configuracoes ? 'configuracoes' : <Tableadmin></Tableadmin>}
      {cadastrarAnalista ? 'cadastrar analista' : <Tableadmin></Tableadmin>}*/}
      {verQuestionario ? <TableQuestionario></TableQuestionario> : <Tableadmin></Tableadmin>}
      {historicoAnalises ? <TableListaEmpresas></TableListaEmpresas> : <Tableadmin></Tableadmin>}
      
      {/*<Tableadmin></Tableadmin>
      <TableAnalysisData></TableAnalysisData>
      <TableListaEmpresas></TableListaEmpresas>
      <TableAnalisesEmpresa></TableAnalisesEmpresa>
      <TableQuestionario></TableQuestionario>*/}


      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </>
  );
}
export default ContainerAdm;