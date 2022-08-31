import React from 'react';
import './main-screen-analyzes-section.css'
import DecrescentVector from '../../assets/decrescent-vector.png'
import CrescentVector from '../../assets/crescent-vector.png'
import GrayStar from '../../assets/gray-star.png'
import GreenStar from '../../assets/green-star.png'
import HalfGreenStar from '../../assets/half-green-star.png'


const MainScreenAnalyzesSection = () =>{
    return(
        <>
            <section className="left-section">
                <h2 className="section-title">Análises Recentes</h2>

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
                
                <a className="see-all-analysis" href="#">Ver todas as análises</a>
            </section>
        </>
    );
}

export default MainScreenAnalyzesSection;