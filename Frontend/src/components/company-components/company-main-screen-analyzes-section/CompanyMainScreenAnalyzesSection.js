import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './company-main-screen-analyzes-section.css';
import DecrescentVector from '../../../images/decrescent-vector.png';
import CrescentVector from '../../../images/crescent-vector.png';
import GrayStar from '../../../images/gray-star.png';
import GreenStar from '../../../images/green-star.png';
import HalfGreenStar from '../../../images/half-green-star.png';

const CompanyMainScreenAnalyzesSection = () =>{
    const [analyzes, setAnalyzes] = useState([]);
    
    const getAnalyzes = async() =>{
        await axios.get('')
        .then(res => {
            setAnalyzes(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <>
            <section className="company-main-screen-left-section">
                <h2 className="section-title">Análises Recentes</h2>

                {/*
                    analyzes.map((analyzes, index) => {
                    <div className="analysis">
                        <h3 className="analysis-title"></h3>
                        <div className="stars">
                            <img src={GreenStar} alt="estrela verde"/>
                            <img src={GreenStar} alt="estrela verde"/>
                            <img src={GreenStar} alt="estrela verde"/>
                            <img src={GreenStar} alt="estrela verde"/>
                            <img src={GrayStar} alt="estrela cinza"/>
                        </div>

                        <div className="vector-container">
                            <span>– 1,0</span>
                            <img className="vector" src={DecrescentVector} alt="Vetor descrescente"/>
                        </div>
                    </div>
                    })
                */}
                
                <div className="analysis">
                    <h3 className="analysis-title">Análise 1</h3>
                    <div className="stars">
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                    </div>

                    <div className="vector-container">
                        <span>– 1,0</span>
                        <img className="vector" src={DecrescentVector} alt="Vetor descrescente"/>
                    </div>
                </div>

                <div className="analysis">
                    <h3 className="analysis-title">Análise 2</h3>
                    <div className="stars">
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GreenStar} alt="estrela verde"/>
                        <img src={GrayStar} alt="estrela cinza"/>
                    </div>

                    <div className="vector-container">
                        <span>– 1,0</span>
                        <img className="vector" src={DecrescentVector} alt="Vetor descrescente"/>
                    </div>
                </div>
                
                <a className="see-all-analysis" href="/CompanyMainScreen/Analyzes">Ver todas as análises</a>
            </section>
        </>
    );
}

export default CompanyMainScreenAnalyzesSection;