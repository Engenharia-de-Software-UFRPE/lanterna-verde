import React from 'react';
import './Analysis.css'
import Questions from './Questions';


const Analysis = ({ analise }) => {

    const handleComentChange= () => {
        analise.comentario= document.getElementById("comentField").value;
        console.log("Valor da chave 'comentário' da analise: " + analise.comentario);
    }

    return <div className='listAnalise'>
        Empresa: {analise.company}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        Questões: {analise.questao_set.map((questao) => (<Questions questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Faça seu comentário: <br></br>
        <textarea id='comentField' className='comentArea' onChange={handleComentChange}>{analise.comment}</textarea>
        <button className='btn-save'>Salvar</button>

    </div>
}; 

export default Analysis;