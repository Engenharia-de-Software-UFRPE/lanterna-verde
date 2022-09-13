import React, {useState} from 'react';
import './Analysis.css'

const Questions = ({ questao, analysis, setDimensions, handleCheckBoxClick }) => {
    


    // const handleCheckBoxClick= () => {
    //       questao.answer= !questao.answer;

    //       let valor = 1;
    //       if(questao.answer === true){
    //         valor = 1;
    //       }
    //       else{
    //         valor = -1;
    //       }

    //       analysis.dimension_count[questao.question.dimension].checked += valor
    //       const copy = analysis.dimension_count
    //       setDimensions(copy)

    //     //   console.log("resposta da questão ("+ questao.question.body + "): " + questao.answer);
        
    //     console.log(analysis.dimension_count[questao.question.dimension])
    //     // console.log(questao.question.dimension)
    // }

    return <div className='listQuestoes'>
                Questão: {questao.question.body} 
                <label class="switch">
                    <input type="checkbox" onClickCapture={() => handleCheckBoxClick(questao)} defaultChecked={questao.answer}>
                    </input>
                    <span class="slider round">
                    </span>
                </label> 
            </div>
}; 

export default Questions;