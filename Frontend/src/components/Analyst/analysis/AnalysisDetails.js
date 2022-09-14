import React, {useState} from 'react';
import './Analysis.css'
import Questions from './Questions';
import QuestionsFinished from './QuestionsFinished';
import Score from './Score';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useAlert } from "react-alert";


const Analysis = ({ analise }) => {

    const idAnalysis = analise.id
    const url = "http://localhost:8000/analise/detail?analysisid="+analise.id


    const [analysis,setAnalysis] = useState("placeholder");
    const [dimensions,setDimensions] = useState({});

    async function analysisDetail() {
        let response = await axios.get(
          url,
          { withCredentials: true }
        )
        .then()
        setDimensions(response.data.analysis.dimension_count)
        setAnalysis(response.data.analysis)
        console.log(response.data.analysis)
    
        
      }

      if (analysis === "placeholder"){
        analysisDetail()
      }



    const navigate = useNavigate();

    const handleComentChange= () => {
      analysis.comment= document.getElementById("comentField").value;
      console.log("Valor da chave 'comentário' da analise: " + analysis.comment);
    }

    
    const backButtonClickHandler =() => {
        navigate('/analystProfile');
    }

    async function handleSaveClick() {
        let res = await axios.post("http://localhost:8000/analise/update",
        analysis,
        {withCredentials: true},
        );

        console.log(url);
    }

    function handleFInishClick() {


    }

    function handleCheckBoxClick(quest) {
      quest.answer= !quest.answer;

      let valor = 1;
      if(quest.answer === true){
        valor = 1;
      }
      else{
        valor = -1;
      }

      analysis.dimension_count[quest.question.dimension].checked += valor
      const copy = analysis.dimension_count
      setDimensions({...copy})


    //   console.log("resposta da questão ("+ questao.question.body + "): " + questao.answer);
    
    console.log(dimensions);
    // console.log(questao.question.dimension)
  }

  async function confirmButtonHandler(inp){
    let res = await axios.post("http://localhost:8000/analise/finish",
    {
     password: inp,
     analysisid: idAnalysis
    },
    {withCredentials: true},
    );

    console.log(inp)
  }

    // console.log(analysis.dimension_count)
    if (analysis.finished === false){
        return <div className='listAnalise'>
        Empresa: {analysis.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}

        Score D1: {((dimensions['D1'].checked)/dimensions['D1'].amount).toFixed(2)}<br></br>
        Score D2: {((dimensions['D2'].checked)/dimensions['D2'].amount).toFixed(2)}<br></br>
        Score D3: {((dimensions['D3'].checked)/dimensions['D3'].amount).toFixed(2)}<br></br>
        Score D4: {((dimensions['D4'].checked)/dimensions['D4'].amount).toFixed(2)}<br></br>
        
        <button className='btns' onClick={handleSaveClick}>Salvar</button>

        <Popup trigger={<button className='btns'>Finalizar</button>}
              anchor={null}>
          <div className='finish_him'>
            <div className='title'>Bota a senha ai moral</div>
            <input className='inp-pass' id='password-conf' type="password"></input>
            <div className='title'>vai peidar na tanga agora?</div>
            <div className='finish-Buttons'><button onClick={() => {confirmButtonHandler(document.getElementById("password-conf").value)}}>SIM</button><button>NAAAH</button></div>
          </div>
        </Popup>

        Questões: {analysis.questao_set.map((questao) => (<Questions questao={questao} analysis={analysis} setDimensions={setDimensions} handleCheckBoxClick={handleCheckBoxClick}/>))}
        {/* Score D1: {analise.dimension_count['D1'].checked / analise.dimension_count['D1'].amount}<br></br> */}

        {/* Score Atual: {analise.score}<br></br><br></br> */}
        Faça seu comentário: <br></br>
        <textarea id='comentField' className='comentArea' onChange={handleComentChange}>{analysis.comment}</textarea>


    </div>
    }
    else {
        return <div className='listAnalise'>
        Empresa que foi avaliada: {analise.company}<br></br>

        Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Comentário feito: <br></br>
        <textarea readonly='true' id='comentField' className='comentArea' >{analise.comment}</textarea>
        <button className='btn-back' onClick={backButtonClickHandler}>Voltar</button>

    </div>
    }

}; 

export default Analysis;