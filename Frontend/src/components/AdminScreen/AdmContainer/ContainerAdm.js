import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalysisTableList from '../AnalysisHistory/AnalysisTableList';
import './ContainerAdm.css';
import TableAnalysisData from '../AnalysisHistory/DadosDaAnalise';
import CompanyList from '../AnalysisHistory/CompanyList';
import ResquestTable from '../AnalysisSolicitation/ResquestTable';
import axios from 'axios';
import AdmScreenData from '../AdmDataAccount/AdmScreenData';
import AnalystRegistration from '../AnalystRegister/AnalystRegistration';
import GASForm from '../Form/GASForm';
import TableListaEmpresas from '../AnalysisHistory/CompanyHistory';
import InfoAnalysis from '../AnalysisHistory/InfoAnalysis';


function ContainerAdm() {

  const [active, setActive] = useState("FirstCard")
  const [minhaConta, setConta] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(false);
  const [cadastrarAnalista, setAnalista] = useState(false);
  const [verQuestionario, setQuestionario] = useState(false);
  const [historicoAnalises, setHistorico] = useState(['placeholder']);
  const [user, setUser] = useState("placeholder");
  const [administrator, setAdministrator] = useState("placeholder");
  const [question,setQuestions] = useState(['placeholder']);

  // async function listAnalysisHistory(){
  //   let response = await axios.get("http://localhost:8000/analise/detail",
  //   { withCredentials: true }
  //   ).then(response => response)
  //   setHistorico(response.data.listar_analises)
  // } 
  // if(historicoAnalises[0] === 'placeholder'){
  //   listAnalysisHistory();
  // }

  const [solAnalise,setSolicitaAnalise] = useState(['placeholder']);

  async function solicitaAnalise() {
    let response = await axios.get(
      "http://localhost:8000/solicitacoesAnalise",
      { withCredentials: true }
    )
    .then(response => response)
    setSolicitaAnalise(response.data.solicitacoes_analise)
  }
  
  if (solAnalise[0] === "placeholder") {
    solicitaAnalise();
  }
  console.log(solAnalise);

  async function listQuestions() {
      let response = await axios.get(
        "http://localhost:8000/perguntas",
        { withCredentials: true }
      )
      .then(response => response)
      setQuestions(response.data.Questoes)
  }
  console.log(question);
  if (question[0] === 'placeholder'){
      listQuestions();
  }

  async function loadAdministrator() {
    axios.defaults.withCredentials = true;
    let response = await axios
      .get("http://localhost:8000/user/admin", { withCredentials: true })
      .then((response) => response);
    setAdministrator(response.data.Administrador);
    setUser(response.data.Usuario);
    console.log(response);

  }

  if (administrator === "placeholder") {
    loadAdministrator();
  }
  if (user === "placeholder") {
    loadAdministrator();
  }

  return (
    <div id="body">
      <div id="admBoard">

        <div id="admPhoto">

        </div>

        <div id="nameAdmArea">
          <h6 class="nameAdm">{`${user.first_name} ${user.last_name} `}</h6>
        </div>
        <div id="usernameAdmArea">
          <h6 class="usernameAdm">{user.username}</h6>
        </div>


        <button onClick={() => setActive("FifthCard")} class='btn'> <h5 className='nameAdm'>Solicitações de Análise</h5></button>
        <button onClick={() => setActive("SecondCard")} class='btn'> <h5 className='nameAdm'>Minha Conta</h5></button>
        <button onClick={() => setActive("ThirdCard")} className='btn'> <h5 className='nameAdm'>Cadastrar Analista</h5> </button>
        <button onClick={() => setActive("FourthCard")} className='btn'> <h5 className='nameAdm'>Ver Questionário</h5> </button>
        <button onClick={() => setActive("FirstCard")} className='btn'> <h5 className='nameAdm'>Histórico de Análises</h5> </button>
      </div>

      <div className='tables'>
        {/* Depois vamos trocar a posição de RequestTable com  TableListaEmpresas*/}
        {active === "FirstCard" && <CompanyList />}
        {active === "SecondCard" && <AdmScreenData />}
        {active === "ThirdCard" && <AnalystRegistration />}
        {active === "FourthCard" && <GASForm analise={question}/>}
        {active === "FifthCard" && <ResquestTable solAnalise={solAnalise}/>}
        {/*{active === "FifthCard" && <InfoAnalysis analise={historicoAnalises}/>}*/}
      </div>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </div>
  );
}
export default ContainerAdm;