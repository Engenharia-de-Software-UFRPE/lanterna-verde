import React, {useEffect, useState} from 'react';
import './Question.css';
import Collapse from 'react-bootstrap/Collapse';
const Questions = ({ questao, analysis, setDimensions, handleCheckBoxClick, handleSourceChange, handleJustificationChange }) => {
    
    const [active, setActive] = useState(false);
    useEffect(() => {
        // setQuest(questao)
        initAnswer()
        // console.log(questao.answer)
    },[])

    function initAnswer(){
        var box = document.getElementById('question'+questao.id)
        if (questao.answer === 1){
            box.style.animation = "positive-neutral 0.125s linear forwards";
            return;
        }
        // else{
        if (questao.answer === 0){
            box.style.animation = "negative-neutral 0.125s linear forwards";
            return;
        }
        return;
        // }
    }
         
    function answerHandler(answer){
        var box = document.getElementById('question'+questao.id)
        console.log("answerhandler answer = " + answer)

        if (questao.answer != true && questao.answer != false){
            if (answer === true){
                box.style.animation = "positive-neutral 0.125s linear forwards";
            }
            // else{
            if (answer === false){
                box.style.animation = "negative-neutral 0.125s linear forwards";
            }
        }
        else{
            answer = !answer

            if (answer === false){
                box.style.animation = "negative 0.125s linear forwards";
                // questao.answer = !questao.answer
                
                
            }
            if (answer === true){
                box.style.animation = "positive 0.125s linear forwards";
                // questao.answer = !questao.answer  
            }
            
        }

        handleCheckBoxClick(questao,answer)

        console.log("answerhandler answer final= " + answer)

    }
      
    function sourceAreaChange() {
        let sourceValue = document.getElementById("questionSource"+questao.id).value
        handleSourceChange(sourceValue,questao)
    }

    function justificationAreaChange() {
        let justificationValue = document.getElementById("questionJustification"+questao.id).value
        handleJustificationChange(justificationValue,questao)
    }

    function questionClickHandler() {
        setActive(!active)
    }

    return <>
            <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
            <script src="https://unpkg.com/react-collapse/build/react-collapse.min.js"></script>
            <div className='question-container'>

                <button className='negative-btn' onClick={() => answerHandler(false)}>
                <img src="../images/x.svg" alt="X"/>
                </button>
                

                <div className='full-question-area'>

                        <div className='questionArea' id={'question'+questao.id} onClick= {questionClickHandler}>
                            {questao.question.body} 
                        </div>

                    <Collapse in={active}>
                        <div className='justi-src-container'>
                            <div className='justification-container' >
                                <div className='just-tittle'>Justificativa:</div>
                                <textarea  className='justificationArea' id = {'questionJustification'+questao.id} onChange={justificationAreaChange}>{questao.justification}</textarea>  <br></br>
                            </div>
                            
                            <div className='source-container'>
                                <div className='source-tittle'>Fonte:</div>
                                <textarea  className='sourceArea' id = {'questionSource'+questao.id} onChange={sourceAreaChange}>{questao.source}</textarea> <br></br>
                            </div>
                        </div> 
                    
                    </Collapse>




                    {/* </div> */}

                       
                            {/* <label class="switch">
                                <input type="checkbox" onClickCapture={() => handleCheckBoxClick(questao)} defaultChecked={questao.answer}></input>
                                <span class="slider round">
                                </span>
                            </label>  */}
                    {/* </div> */}
                </div>

                <button className='positive-btn' onClick={() => answerHandler(true)}>
                    <img src="../images/v.svg" alt="V"/>
                </button>   
                



            </div>
            </>
}; 

export default Questions;