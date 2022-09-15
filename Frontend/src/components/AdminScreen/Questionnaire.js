import React from "react";
import './Questionnaire.css';

const Questionnaire = ({ questao }) => {
    

    return <div className='listQuestoes'>
                Questão: {questao.body} 
            </div>
}

export default Questionnaire;