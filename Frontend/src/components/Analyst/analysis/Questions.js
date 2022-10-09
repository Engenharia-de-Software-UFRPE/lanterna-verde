import React, {useEffect} from 'react';
import './Question.css'

const Questions = ({ questao, analysis, setDimensions, handleCheckBoxClick, handleSourceChange, handleJustificationChange }) => {
    

    useEffect(() => {
        // setQuest(questao)
        initAnswer()
    },[])

    function initAnswer(){
        var box = document.getElementById('question'+questao.id)
        if (questao.answer){
            box.style.animation = "positive 0.125s linear forwards";
        }
        else{
            box.style.animation = "negative 0.125s linear forwards";
        }
    }
         
    function answerHandler(){
        var box = document.getElementById('question'+questao.id)
        if (questao.answer){
            box.style.animation = "negative 0.125s linear forwards";
            questao.answer = !questao.answer
        }
        else{
            box.style.animation = "positive 0.125s linear forwards";
            questao.answer = !questao.answer
        }

    }
      
    function sourceAreaChange() {
        let sourceValue = document.getElementById("questionSource"+questao.id).value
        handleSourceChange(sourceValue,questao)
    }

    function justificationAreaChange() {
        let justificationValue = document.getElementById("questionJustification"+questao.id).value
        handleJustificationChange(justificationValue,questao)
    }



    // document.onload = initAnswer();
    return <>
            <div className='question-container'>

                {/* <div className='negative-container'> */}
                    <button className='negative-btn' onClick={answerHandler}>X</button>
                {/* </div> */}
                

                <div className='full-question-area'>
                    {/* <div className='question-and-awnser'> */}
                    
                    
                    {/* <div className='alig-areas'> */}

                        <div className='questionArea' id={'question'+questao.id}>
                        {questao.question.body} 
                        
                        </div>

                        <div className='justification-container' >
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
                    <button className='positive-btn' onClick={answerHandler}>V</button>   
                {/* </div> */}


            </div>
            </>
}; 

export default Questions;