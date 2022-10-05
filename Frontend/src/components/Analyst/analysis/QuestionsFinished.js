import React from 'react';
import './Analysis.css'

const QuestionsFinished = ({ questao }) => {

    return <><div className='listQuestoes'>
                Questão: {questao.question.body} 
                <label class="switch">
                    <input type="checkbox" disabled="disabled" defaultChecked={questao.answer}>
                    </input>
                    <span class="slider round">
                    </span>
                </label> 
        
            </div>
        
        {questao.answer ? 
        <>
        Fonte:<br></br> <textarea readonly  = 'true' className='sourceArea' id = {'questionSource'+questao.id} >{questao.source}</textarea> <br></br>
        Justificativa:<br></br> <textarea readonly = 'true'  className='justificationArea' id = {'questionJustification'+questao.id}>{questao.justification}</textarea>  <br></br>
        </> 
        : <></>}

        </>
}; 

export default QuestionsFinished;