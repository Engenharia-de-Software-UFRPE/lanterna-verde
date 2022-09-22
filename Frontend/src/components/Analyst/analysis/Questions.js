import React, {useState} from 'react';
import './Analysis.css'

const Questions = ({ questao, analysis, setDimensions, handleCheckBoxClick, handleSourceChange, handleJustificationChange }) => {
    


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


    function sourceAreaChange() {
        let sourceValue = document.getElementById("questionSource"+questao.id).value
        handleSourceChange(sourceValue,questao)
    }

    function justificationAreaChange() {
        let justificationValue = document.getElementById("questionJustification"+questao.id).value
        handleJustificationChange(justificationValue,questao)
    }
    return <>
            <div className='listQuestoes'>
                {/* <div className='question-and-awnser'> */}
                        Questão: {questao.question.body} 
                        <label class="switch">
                            <input type="checkbox" onClickCapture={() => handleCheckBoxClick(questao)} defaultChecked={questao.answer}>
                            </input>
                            <span class="slider round">
                            </span>
                        </label> 
                {/* </div> */}
            </div>
            Fonte:<br></br> <textarea  className='sourceArea' id = {'questionSource'+questao.id} onChange={sourceAreaChange}>{questao.source}</textarea> <br></br>
            Justificativa:<br></br> <textarea  className='justificationArea' id = {'questionJustification'+questao.id} onChange={justificationAreaChange}>{questao.justification}</textarea>  <br></br>
            </>
}; 

export default Questions;