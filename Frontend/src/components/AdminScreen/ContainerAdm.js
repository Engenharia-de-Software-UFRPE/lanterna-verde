import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnalysisTableList from './AnalysisTableList';
import './ContainerAdm.css';
import TableAnalysisData from './DadosDaAnalise';
import AnalysisHistory from './AnalysisHistory';
import ResquestTable from './ResquestTable';
import TableQuestionario from './TelaQuestionario';
import axios from 'axios';
import AdmScreenData from './AdmScreenData';
import AnalystRegistration from './AnalystRegistration';
import GASForm from './GASForm';
import TableListaEmpresas from './CompanyHistory';


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

  async function listAnalysis() {
    axios.defaults.withCredentials = true;
    let response = await axios
      .get("http://localhost:8000/user/admin", { withCredentials: true })
      .then((response) => response);
    setAdministrator(response.data.Administrador);
    setUser(response.data.Usuario);
    console.log(response);

  }

  if (administrator === "placeholder") {
    listAnalysis();
  }
  if (user === "placeholder") {
    listAnalysis();
  }
  //window.addEventListener('resize', showButton);

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


        <button onClick={() => setActive("FirstCard")} class='btn'> <h5 className='nameAdm'></h5>Solicitações de Análise</button>
        <button onClick={() => setActive("SecondCard")} class='btn'> <h5 className='nameAdm'></h5>Minha Conta </button>
        <button onClick={() => setActive("ThirdCard")} className='btn'> <h5 className='nameAdm'>Cadastrar Analista</h5> </button>
        <button onClick={() => setActive("FourCard")} className='btn'> <h5 className='nameAdm'>Ver Questionário</h5> </button>
        <button onClick={() => setActive("FiveCard")} className='btn'> <h5 className='nameAdm'>Histórico de Análises</h5> </button>
      </div>

      <div className='tables'>
        {active === "FirstCard" && <ResquestTable />}
        {active === "SecondCard" && <AdmScreenData />}
        {active === "ThirdCard" && <AnalystRegistration />}
        {active === "FourCard" && <GASForm analise={question}/>}
        {active === "FiveCard" && <TableListaEmpresas />}
      </div>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </div>
  );
}
export default ContainerAdm;