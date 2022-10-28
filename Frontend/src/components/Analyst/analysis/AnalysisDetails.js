import React, {useEffect, useState} from 'react';
import './Analysis.css'
import Questions from './Questions';
import QuestionsFinished from './QuestionsFinished';
import Score from './Score';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { Navigate } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


const Analysis = ({ analise }) => {

    const navigate = useNavigate();
    const idAnalysis = analise.id
    const url = "http://localhost:8000/analise/detail?analysisid="+analise.id


    const [analysis,setAnalysis] = useState("placeholder");

    // const [analysisTotalCount,setTotalCount] = useState(1);
    // const [analysisAnsweredCount,setAnsweredCount] = useState(0);
    const [analysisCountRate,setCountRate] = useState(0);
    const [totalQuestions,setTotalQuestions] = useState(1);

    const [dimensions,setDimensions] = useState({});

    const [isOpen, setIsOpen] = useState(false); //popup

    useEffect(() => {
      analysisDetail()
        
    },[])


    async function analysisDetail() {
        let response = await axios.get(
          url,
          { withCredentials: true }
        )
        .then()
        
        setDimensions(response.data.analysis.dimension_count)
        setAnalysis(response.data.analysis)

        setTotalQuestions(response.data.analysis.questao_set.length)
        // setTotalCount(response.data.analysis.questao_set.length)
        // calcAnswered(response.data.analysis.questao_set)
        // let answered = calcAnswered(response.data.analysis.questao_set)

        let answered = calcAnswered(response.data.analysis.questao_set);
        // for (let i = 0; i < response.data.analysis.questao_set.length; i++){
        //   if (response.data.analysis.questao_set[i].answer != 2) {
        //     answered += 1
        //   }
        //   // console.log(questions_set[i].answer)
        //   // setAnsweredCount(answered);
        // }

        // setAnsweredCount(answered);
        // setTotalCount(response.data.analysis.questao_set.length);
  
        setCountRate(((answered/response.data.analysis.questao_set.length)*100).toFixed(2));

        // console.log("rate inicial: " + analysisCountRate)
      

        // setCountRate((answered/response.data.analysis.questao_set.length)*100)

        // calcAndSetRate(response.data.analysis.questao_set, response.data.analysis.questao_set.length)
    
        // console.log(response.data.analysis)
        
      }

    function calcAnswered(questions_set){
      let answered = 0;
      for (let i = 0; i < questions_set.length; i++){
        if (questions_set[i].answer != 2) {
          answered += 1
        }
        // console.log(questions_set[i].answer)
        // setAnsweredCount(answered);
      }
      // console.log("respondidas: " + answered)
      return answered;
    }



    // function calcAndSetRate(questions_set,total){
    //   let answered = calcAnswered(questions_set);

    //   setAnsweredCount(answered);
    //   setTotalCount(total);

    //   setCountRate((answered/total)*100);
    // }


      // if (analysis === "placeholder"){
      //   analysisDetail()
      // }



    

    const handleComentChange= () => {
      analysis.comment= document.getElementById("comentField").value;
      console.log("Valor da chave 'comentário' da analise: " + analysis.comment);
    }

    const handleSourceChange= (e,quest) => {
      console.log("Valor do que esta sendo escrito: " + e + " da questão: " + quest.question.body);
      quest.source = e
    }

    const handleJustificationChange= (e,quest) => {
      console.log("Valor do que esta sendo escrito: " + e + " da questão: " + quest.question.body);
      quest.justification = e
    }

    
    const backButtonClickHandler =() => {
        navigate('/analystProfile');
    }

    async function handleSaveClick() {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
        let res = await axios.post("http://localhost:8000/analise/update",
        analysis,
        {withCredentials: true},
        );

        console.log(url);
    }

    function handleFInishClick() {


    }

    function handleCheckBoxClick(quest,answer) {
      let wasNotAnswered = false
      if (quest.answer === 2){
        wasNotAnswered = true
      }
      // if (wasNotAnswered === true){
      //   setAnsweredCount(analysisAnsweredCount+1)
      //   console.log ("contador total de ")
      // }
      // quest.answer= !quest.answer;
      // quest.answer= 2;
      if (answer === true){
        quest.answer = 1;
      }
      if (answer === false){
        quest.answer = 0;
      }

      let valor = 1;
      if(quest.answer === 1){
        valor = 1;
      }
      if(quest.answer === 0){
        if (wasNotAnswered === false){
          valor = -1;
        }
        else{
          valor = 0
        }
        
      }

      analysis.dimension_count[quest.question.dimension].checked += valor
      const copy = analysis.dimension_count
      setDimensions({...copy})

      // calcAndSetRate(analysis.questao_set,analysis.questao_set.length)
      // let answered = calcAnswered(analysis.questao_set);

      // setAnsweredCount(answered);
      // setTotalCount(analysis.questao_set.length);
      

      let answered = calcAnswered(analysis.questao_set);
      // for (let i = 0; i < analysis.questao_set.length; i++){
      //   if (analysis.questao_set[i].answer != 2) {
      //     answered += 1
      //   }
      //   // console.log(questions_set[i].answer)
      //   // setAnsweredCount(answered);
      // }

      // setAnsweredCount(answered);
      // setTotalCount(response.data.analysis.questao_set.length);

      setCountRate(((answered/analysis.questao_set.length)*100).toFixed(2));

      // console.log("respondidas: " + analysisAnsweredCount + " e total: " + analysisTotalCount + " e a taxa: " + analysisCountRate)


    //   console.log("resposta da questão ("+ questao.question.body + "): " + questao.answer);
    
    // console.log(quest.answer)
    // console.log(questao.question.dimension)
  }

  async function confirmButtonHandler(inp){

    handleSaveClick()
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    let res = await axios.post("http://localhost:8000/analise/finish",
    {
     password: inp,
     analysisid: idAnalysis
    },
    {withCredentials: true},
    );
    
    if (res.status === 401) {
      navigate(-1);
    }
    else {
      navigate('/analystProfile');
    }

    // console.log(inp)
  }

  // function progressTest(){
  //   setCountRate(analysisCountRate+10)
  // }

    if (analysis.status < 2 ){
        return (<div className='listAnalise'>
        Empresa: {analysis.company.tradeName}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Score D1: {((dimensions['D1'].checked)/dimensions['D1'].amount).toFixed(2)}<br></br>
        Score D2: {((dimensions['D2'].checked)/dimensions['D2'].amount).toFixed(2)}<br></br>
        Score D3: {((dimensions['D3'].checked)/dimensions['D3'].amount).toFixed(2)}<br></br>
        Score D4: {((dimensions['D4'].checked)/dimensions['D4'].amount).toFixed(2)}<br></br>
        Score TOTAL: {((((dimensions['D1'].checked)/dimensions['D1'].amount) + ((dimensions['D2'].checked)/dimensions['D2'].amount) + ((dimensions['D3'].checked)/dimensions['D3'].amount) + ((dimensions['D4'].checked)/dimensions['D4'].amount))/4).toFixed(2)} <br></br>
        


        
        {/* <button className='btns' onClick={progressTest}>teste</button> */}


        <div className='progress-container'>
          <div className='bar'>
            <ProgressBar now={analysisCountRate} color="green" label={analysisCountRate + "%"} className="progress"/>
          </div>

          {/* <div className='btns-container'> */}
            
            {/* <div>{analysisCount}</div>
            <button onClick={progressTest}>teste</button> */}

            <button className='btns' onClick={handleSaveClick}>Salvar</button>

            {analysisCountRate >= 100 ? 
              <Popup trigger={<button className='btns'>Finalizar</button>} className="pop" modal nested
                open={isOpen}
                onOpen={() => setIsOpen(!isOpen)}>

                <div className='finish_him'>
                  <div className='title'>Insira sua senha</div>
                  <input className='inp-pass' id='password-conf' type="password"></input>
                  <div className='title'>Deseja finalizar a análise?</div>

                  <div className='finish-Buttons'>
                    <button className='btns' onClick={() => {confirmButtonHandler(document.getElementById("password-conf").value)}}>SIM</button>
                    <button className='btns' onClick={() => setIsOpen(!isOpen)}>NÃO</button>
                  </div>
                </div>
                
              </Popup>
            :
            <Popup trigger={<button className='btns-not-finished'>Finalizar</button>} className="pop" modal nested
              open={isOpen}
              onOpen={() => setIsOpen(!isOpen)}>

              <div className='analysis_not_finished'>
                <div className='title'>Você ainda não concluiu sua análise, por favor, responda todas as perguntas para poder finalizar</div>
                <div className='finish-Buttons'>
                  <button className='btns' onClick={() => setIsOpen(!isOpen)}>Voltar para a análise</button>
                </div>
              </div>
            </Popup>
            }

            
          {/* </div> */}

        </div>

        {analysis.questao_set.map((questao) => (<Questions questao={questao} analysis={analysis} setDimensions={setDimensions} handleCheckBoxClick={handleCheckBoxClick} handleSourceChange={handleSourceChange} handleJustificationChange={handleJustificationChange}/>))}
        {/* Score D1: {analise.dimension_count['D1'].checked / analise.dimension_count['D1'].amount}<br></br> */}

        {/* Score Atual: {analise.score}<br></br><br></br> */}
        Faça seu comentário: <br></br>
        <textarea id='comentField' className='comentArea' onChange={handleComentChange}>{analysis.comment}</textarea>


    </div>)
    }
    else {
        return (<div className='listAnalise'>
        Empresa que foi avaliada: {analise.company.tradeName  }<br></br>

        Score D1: {(analise.dimension_count['D1'].checked/analise.dimension_count['D1'].amount).toFixed(2)}<br></br>
        Score D2: {(analise.dimension_count['D2'].checked/analise.dimension_count['D2'].amount).toFixed(2)}<br></br>
        Score D3: {(analise.dimension_count['D3'].checked/analise.dimension_count['D3'].amount).toFixed(2)}<br></br>
        Score D4: {(analise.dimension_count['D4'].checked/analise.dimension_count['D4'].amount).toFixed(2)}<br></br>
        Score TOTAL: {(((analise.dimension_count['D1'].checked/analise.dimension_count['D1'].amount)+(analise.dimension_count['D2'].checked/analise.dimension_count['D2'].amount)+(analise.dimension_count['D3'].checked/analise.dimension_count['D3'].amount)+(analise.dimension_count['D4'].checked/analise.dimension_count['D4'].amount))/4).toFixed(2)} <br></br>
        Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Comentário feito: <br></br>
        {/* <textarea readonly='true' id='comentFieldFinished' className='comentArea' >{analise.comment}</textarea> */}
        {analise.comment}<br></br>
        <button className='btn-back' onClick={backButtonClickHandler}>Voltar</button>

    </div>)
    }

}; 

export default Analysis;