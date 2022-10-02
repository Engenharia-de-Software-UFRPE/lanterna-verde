import React from "react";
import './Questionnaire.css';

const Questionnaire = ({ questao }) => {
    

    return (<div className='questionList'>
                <strong>Questão:</strong><h5 className="questionBody">{questao.body}</h5> 
            </div>);
}

export default Questionnaire;