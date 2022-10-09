import React, {useState} from 'react';
import './Question.css'

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
            <div className='question-container'>

                {/* <div className='negative-container'> */}
                    <button className='negative-btn'>X</button>
                {/* </div> */}
                

                <div className='full-question-area'>
                    {/* <div className='question-and-awnser'> */}
                    
                    
                    {/* <div className='alig-areas'> */}

                        <div className='questionArea'>
                        {questao.question.body} 
                        
                        </div>
                        
                        <br></br>
                        <div className='justification-container'>
                            Justificativa:<br></br> <textarea  className='justificationArea' id = {'questionJustification'+questao.id} onChange={justificationAreaChange}>{questao.justification}</textarea>  <br></br>
                        </div>
                        
                        <div className='source-container'>
                            Fonte:<br></br> <textarea  className='sourceArea' id = {'questionSource'+questao.id} onChange={sourceAreaChange}>{questao.source}</textarea> <br></br>
                        </div>



                    {/* </div> */}

                       
                            {/* <label class="switch">
                                <input type="checkbox" onClickCapture={() => handleCheckBoxClick(questao)} defaultChecked={questao.answer}></input>
                                <span class="slider round">
                                </span>
                            </label>  */}
                    {/* </div> */}
                </div>
                {/* <div className='positive-container'> */}
                    <button className='positive-btn'>V</button>   
                {/* </div> */}


            </div>
            </>
}; 

export default Questions;