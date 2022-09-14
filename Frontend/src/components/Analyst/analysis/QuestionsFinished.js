import React from 'react';
import './Analysis.css'

const QuestionsFinished = ({ questao }) => {

    return <div className='listQuestoes'>
                Questão: {questao.question.body} 
                <label class="switch">
                    <input type="checkbox" disabled="disabled" defaultChecked={questao.answer}>
                    </input>
                    <span class="slider round">
                    </span>
                </label> 
            </div>
}; 

export default QuestionsFinished;