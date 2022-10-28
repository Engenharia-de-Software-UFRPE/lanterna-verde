import React, {useEffect, useState} from 'react';
import './Question.css'
import Collapse from 'react-bootstrap/Collapse';

const QuestionsFinished = ({ questao}) => {
    
    const [active, setActive] = useState(false);
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
         
    function questionClickHandler() {
        setActive(!active)
    }

    // document.onload = initAnswer();
    return <>
        <div className='question-container'>

            {/* <div className='negative-container'> */}
                <button className='negative-btn' >
                <img src="../images/x.svg" alt="X"/>
                </button>
            {/* </div> */}


            <div className='full-question-area'>
                {/* <div className='question-and-awnser'> */}
                
                
                {/* <div className='alig-areas'> */}
                    <div className='questionArea' id={'question'+questao.id} onClick= {questionClickHandler}>
                        {questao.question.body} 
                    </div>

                    <Collapse in={active}>
                        <div className='justi-src-container'>
                            <div className='justification-container' >
                                <div className='just-tittle'>Justificativa:</div>
                                <textarea readOnly='true' className='justificationArea' id = {'questionJustification'+questao.id}>{questao.justification}</textarea>  <br></br>
                            </div>
                            
                            <div className='source-container'>
                                <div className='source-tittle'>Fonte:</div>
                                <textarea readOnly='true' className='sourceArea' id = {'questionSource'+questao.id} >{questao.source}</textarea> <br></br>
                            </div>
                        </div> 
                    </Collapse>




            </div>
            {/* <div className='positive-container'> */}
                <button className='positive-btn'>
                    <img src="../images/v.svg" alt="V"/>
                </button>   
            {/* </div> */}


        </div>
        </>
}; 

export default QuestionsFinished;
