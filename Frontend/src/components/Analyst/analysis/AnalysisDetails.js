import React, {useState} from 'react';
import './Analysis.css'
import Questions from './Questions';
import QuestionsFinished from './QuestionsFinished';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Analysis = ({ analise }) => {
    const idAnalysis = analise.id
    const url = "http://localhost:8000/analise/detail?analysisid="+analise.id


    const [analysis,setAnalysis] = useState("placeholder");

    async function analysisDetail() {
        let response = await axios.get(
          url,
          { withCredentials: true }
        )
        .then(response => response)
        setAnalysis(response.data.analysis)
        // console.log(analysis)
    
        
      }

      if (analysis === "placeholder"){
        analysisDetail()
      }

    const [dimensions,setDimensions] = useState(analise.dimension_count);

    const navigate = useNavigate();

    const handleComentChange= () => {
        analise.comment= document.getElementById("comentField").value;
        console.log("Valor da chave 'comentário' da analise: " + analise.comment);
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

    // console.log(analysis.dimension_count)
    if (analysis.finished === false){
        return <div className='listAnalise'>
        Empresa: {analysis.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Questões: {analysis.questao_set.map((questao) => (<Questions questao={questao} analysis={analysis} setDimensions={setDimensions} />))}
        {/* Score D1: {analise.dimension_count['D1'].checked / analise.dimension_count['D1'].amount}<br></br> */}
        Score D1: {(dimensions['D1'].checked / dimensions['D1'].amount).toFixed(2)}<br></br>
        {/* Score Atual: {analise.score}<br></br><br></br> */}
        Faça seu comentário: <br></br>
        <textarea id='comentField' className='comentArea' onChange={handleComentChange}>{analysis.comment}</textarea>
        <button className='btn-save' onClick={handleSaveClick}>Salvar</button>

    </div>
    }
    else {
        return <div className='listAnalise'>
        Empresa que foi avaliada: {analise.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Comentário feito: <br></br>
        <textarea readonly='true' id='comentField' className='comentArea' >{analise.comment}</textarea>
        <button className='btn-back' onClick={backButtonClickHandler}>Voltar</button>

    </div>
    }

}; 

export default Analysis;