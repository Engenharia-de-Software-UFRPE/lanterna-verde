import React, { useEffect, useState } from 'react';
import './company-analyzes.css'
import axios from 'axios';
import CompanyConfirmationPopup from '../company-confirmation-popup/CompanyConfirmationPopup'
import DecrescentVector from '../../../images/decrescent-vector.png';
import CrescentVector from '../../../images/crescent-vector.png';
import GrayStar from '../../../images/gray-star.png';
import GreenStar from '../../../images/green-star.png';
import HalfGreenStar from '../../../images/half-green-star.png';

const CompanyAnalyzes = () =>{
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        sendGetRequest()
    }, [])

    const getDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const sendGetRequest = async () => {
        await axios.get('http://localhost:8000/empresa/analises', { withCredentials: true })
        .then(res => {
            setAnalysis(res.data['Analises'])
        })
        .catch( error=>{
            alert("Erro")
        })
    }

    return(
        <section className="company-analyzes-section">

            <h2 className='section-title'>Análises</h2>

            <div className='analysis-container'>
                {analysis.map((analysisData, index) => (
                    <Analysis analysisDate={getDate(analysisData.update_date)} analysisId={analysisData.id}
                    analysisScore={analysisData.score} previousAnalysisScore={index===(analysis.length-1) ? 0 : analysis[index+1].score} />
                ))}
            </div>
                
        </section>

    );
}
export default CompanyAnalyzes;


const Analysis = ({analysisDate, analysisId, analysisScore, previousAnalysisScore}) =>{
    const [active, setMode] = useState(false)
    const toggleMode = () =>{
      setMode(!active)
    }
    const [popup, setPopup] = useState(false);
    const [stars, setStars] = useState([]);
    const [vectorValue, setVectorValue] = useState("")
    const [vectorValuePositive, setVectorValuePositive] = useState(true)

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


    return(
        <>
            <CompanyConfirmationPopup open= {popup} analysisId={analysisId} onClose={()=>setPopup(false)}/>

            <div className="analysis">
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
                <button className='btn-reanalysis' onClick={() => setPopup(true)}>Reanálise</button>
            </div>
        </>
    )
}