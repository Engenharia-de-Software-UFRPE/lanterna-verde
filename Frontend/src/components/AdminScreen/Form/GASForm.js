import React from 'react';
import Questionnaire from "./Questionnaire";

const GASForm = ({ analise }) => {
    
    console.log(analise);
    return(
        <div className='listAnalise'>
            {analise.map((questao) => (<Questionnaire questao={questao}/>))}
        </div>
    );
}

export default GASForm;