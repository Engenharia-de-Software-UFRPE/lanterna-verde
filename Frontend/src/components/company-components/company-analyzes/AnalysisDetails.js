import React, {useState} from 'react';
import './Analysis.css'
import QuestionsFinished from './QuestionsFinished';
import {useNavigate} from 'react-router-dom';


const Analysis = ({ analise }) => {
    const navigate = useNavigate();
    const backButtonClickHandler =() => {
      navigate(-1);
    }
 

    
  return (<div className='listAnalise'>
  {analise.id}
  {analise.status}
  {/* Score D1: {(analise.dimension_count['D1'].checked/analise.dimension_count['D1'].amount).toFixed(2)}<br></br>
  Score D2: {(analise.dimension_count['D2'].checked/analise.dimension_count['D2'].amount).toFixed(2)}<br></br>
  Score D3: {(analise.dimension_count['D3'].checked/analise.dimension_count['D3'].amount).toFixed(2)}<br></br>
  Score D4: {(analise.dimension_count['D4'].checked/analise.dimension_count['D4'].amount).toFixed(2)}<br></br>
  Score TOTAL: {(((analise.dimension_count['D1'].checked/analise.dimension_count['D1'].amount)+(analise.dimension_count['D2'].checked/analise.dimension_count['D2'].amount)+(analise.dimension_count['D3'].checked/analise.dimension_count['D3'].amount)+(analise.dimension_count['D4'].checked/analise.dimension_count['D4'].amount))/4).toFixed(2)} <br></br> */}
  {/* Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))} */}

  {/* Comentário feito: <br></br> */}
  {/* <textarea readonly='true' id='comentFieldFinished' className='comentArea' >{analise.comment}</textarea> */}
  {/* {analise.comment}<br></br> */}
  <button className='btn-back' onClick={backButtonClickHandler}>Voltar</button>

  </div>)

}; 

export default Analysis;