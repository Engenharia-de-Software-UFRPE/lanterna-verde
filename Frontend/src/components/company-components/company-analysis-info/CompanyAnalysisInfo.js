import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import './company-analysis-info.css'
import { getAnalysisInfo } from '../../../requests/CompanyRequests';
import CompanyConfirmationPopup from '../company-confirmation-popup/CompanyConfirmationPopup';
import GrayStar from '../../../images/gray-star.png';
import GreenStar from '../../../images/green-star.png';
import HalfGreenStar from '../../../images/half-green-star.png';

const CompanyAnalysisInfo = () =>{
    const [popup, setPopup] = useState(false);
    const [analysis, setAnalysis] = useState([]);
    const [report, setReport] = useState([]);
    const [ascoreStars, setAscoreStars] = useState([]);
    const location = useLocation();
    

    useEffect(() => {
        getAnalysis()
    },[])

    const getAnalysis = async () => {
        await getAnalysisInfo(location.state.id)
        .then(response =>{
            if(response.status == 200){
                let data = response.data
                setAnalysis(data.Solicitacao.analises[0])
                setReport(data.Relatorio)
                let array = []
            //NEED REFACTOR AND CHANGE IN THE LOGIC
                for(let i=0; i< (data.Relatorio.ascore/2); i++){
                    if((data.Relatorio.ascore%2)===1 && i===((data.Relatorio.ascore/2)-0.5)){
                        array.push(false)
                    }
                    else{
                        array.push(true)
                    }
                }
                setAscoreStars(array);
            }
        })
    };

    const getDate = () => {
        return new Date(analysis.update_date).toLocaleDateString()
    }


    return (
        <>
            <section className='analysis-info-section'>
                <div className='analysis-info-container'>
                    <CompanyConfirmationPopup open= {popup} analysisId={analysis.id} isAnalysis={false} onClose={()=>setPopup(false)}/>

                    <h3 className='analysis-date'>{getDate()}</h3>
                    <h2 className='title'>Análise</h2>

                    <div className='dimensions'>
                        <div className='dimension'>
                            <h3 className='dimension-title'>Dimensão 1</h3>
                            <h4 className='dimension-score'><strong>Score: </strong>{report.scoreD1/2}</h4>
                        </div>
                        <div className='dimension'>
                            <h3 className='dimension-title'>Dimensão 2</h3>
                            <h4 className='dimension-score'><strong>Score: </strong>{report.scoreD2/2}</h4>
                        </div>
                        <div className='dimension'>
                            <h3 className='dimension-title'>Dimensão 3</h3>
                            <h4 className='dimension-score'><strong>Score: </strong>{report.scoreD3/2}</h4>
                        </div>
                        <div className='dimension'>
                            <h3 className='dimension-title'>Dimensão 4</h3>
                            <h4 className='dimension-score'><strong>Score: </strong>{report.scoreD4/2}</h4>
                        </div>
                    </div>

                    <div className='ascore-container'>
                        <h3 className='ascore'><strong>Ascore: </strong> {report.ascore/2}</h3>
                        <div className='ascore-stars'>
                            <div className='gray-stars'>
                                <img src={GrayStar} alt="estrela cinza"/>
                                <img src={GrayStar} alt="estrela cinza"/>
                                <img src={GrayStar} alt="estrela cinza"/>
                                <img src={GrayStar} alt="estrela cinza"/>
                                <img src={GrayStar} alt="estrela cinza"/>
                            </div>

                            <div className='green-stars'>
                                {ascoreStars.map((star, index) => (
                                    <img className='greenstar' src={star ? GreenStar : HalfGreenStar} alt={star ? "estrela verde" : "meia estrela verde"}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='comment'>
                            <h3 className='comment-title'>Comentário do analista</h3>
                            <p className='comment-text'>{analysis.comment}</p>
                        </div>
                        <div className='comment'>
                            <h3 className='comment-title'>Comentário do administrador</h3>
                            <p className='comment-text'>{report.adm_comment}</p>
                        </div>
                    </div>
                    <button className='btn-reanalysis' onClick={() => setPopup(true)}>Reanálise</button>
                </div>
            </section>
        </>
    )
} 

export default CompanyAnalysisInfo;