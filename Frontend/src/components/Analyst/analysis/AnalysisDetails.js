import React from 'react';
import './Analysis.css'
import Questions from './Questions';
import QuestionsFinished from './QuestionsFinished';


const Analysis = ({ analise }) => {

    const handleComentChange= () => {
        analise.comentario= document.getElementById("comentField").value;
        console.log("Valor da chave 'comentário' da analise: " + analise.comentario);
    }

    const backButtonClickHandler =() => {

    }

    if (analise.finished === false){
        return <div className='listAnalise'>
        Empresa: {analise.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Questões: {analise.questao_set.map((questao) => (<Questions questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Faça seu comentário: <br></br>
        <textarea id='comentField' className='comentArea' onChange={handleComentChange}>{analise.comment}</textarea>
        <button className='btn-save'>Salvar</button>

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