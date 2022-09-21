import './InfoAnalysis.css';
import React from 'react';
import QuestionsFinished from '../../Analyst/analysis/QuestionsFinished';

const InfoAnalysis = ({analise}) =>{
    return <div className='listAnalise'>
        Empresa que foi avaliada: {analise.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Comentário feito: <br></br>
        <textarea readonly='true' id='comentField' className='comentArea' >{analise.comment}</textarea>
       

    </div>
}
export default InfoAnalysis;