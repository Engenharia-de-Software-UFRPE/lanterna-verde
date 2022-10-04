import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './company-analyzes.css'
import DecrescentVector from '../../../images/decrescent-vector.png';
import CrescentVector from '../../../images/crescent-vector.png';
import GrayStar from '../../../images/gray-star.png';
import GreenStar from '../../../images/green-star.png';
import HalfGreenStar from '../../../images/half-green-star.png';

const CompanyAnalysis = ({analysisDate, analysisId, analysisScore, previousAnalysisScore}) =>{
    const [active, setMode] = useState(false)
    const toggleMode = () =>{
      setMode(!active)
    }
    const [stars, setStars] = useState([]);
    const [vectorValue, setVectorValue] = useState("")
    const [vectorValuePositive, setVectorValuePositive] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        defineVectorValue(analysisScore, previousAnalysisScore)
        let array = []
        for(let i=0; i< (analysisScore/2); i++){
            if((analysisScore%2)===1 && i===((analysisScore/2)-0.5)){
                array.push(false)
            }
            else{
                array.push(true)
            }
        }
        setStars(array);
    }, [])

    function defineVectorValue(analysisScore, previousAnalysisScore) {
        let result = (analysisScore/2) - (previousAnalysisScore/2);
        if(result>0){
            setVectorValue("+ "+ result)
            setVectorValuePositive(true)

        }
        else if(result<0){
            setVectorValue("- "+ Math.abs(result))
            setVectorValuePositive(false)
        }
        else{
            setVectorValue("0")
            setVectorValuePositive(true)

        }
    }

    const openAnalysisInfo=()=>{
        navigate('/CompanyMainScreen/Analyzes/Analysis',{state:{
            id: analysisId
        }})
    }


    return(
        <>
            <a className="analysis" onClick={()=>{openAnalysisInfo()}}>
                <div className='analysis-text-container'>
                    <h3 className="analysis-title">Análise</h3>
                    <h4 className='analysis-date'>{analysisDate}</h4>
                </div>
                
                <div className="stars">
                    
                    <div className='gray-stars'>
                        <img src={GrayStar} alt="estrela cinza"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                    </div>
                    
                    <div className='green-stars'>
                        {stars.map((star, index) => (
                            <img className='greenstar' src={star ? GreenStar : HalfGreenStar} alt={star ? "estrela verde" : "meia estrela verde"}/>
                        ))}
                    </div>
                
                </div>

                <div className="vector-container">
                    <span className={vectorValuePositive ? "vector-value positive" : "vector-value negative"}>{vectorValue}</span>
                    <img className="vector" src={vectorValuePositive ? CrescentVector : DecrescentVector} alt={vectorValuePositive ? "vetor crescente" : "vetor decrescente"}/>
                </div>
            </a>
        </>
    )
}
    export default CompanyAnalysis;

