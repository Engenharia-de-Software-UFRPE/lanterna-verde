import React from 'react';
import './Analysis.css'

const Questions = ({ questao }) => {

    const handleCheckBoxClick= () => {
          questao.anwser= !questao.anwser;
          console.log("resposta da questão ("+ questao.question.body + "): " + questao.answer);
    }

    return <div className='listQuestoes'>
                Questão: {questao.question.body} 
                <label class="switch">
                    <input type="checkbox" onClickCapture={handleCheckBoxClick} defaultChecked={questao.answer}>
                    </input>
                    <span class="slider round">
                    </span>
                </label> 
            </div>
}; 

export default Questions;