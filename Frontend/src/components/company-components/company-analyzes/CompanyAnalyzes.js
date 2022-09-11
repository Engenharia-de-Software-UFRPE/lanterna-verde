import React from 'react';
import './company-analyzes.css'
import CompanyConfirmationPopup from '../company-confirmation-popup/CompanyConfirmationPopup'
import {useState} from 'react';
import DecrescentVector from '../../../images/decrescent-vector.png';
import CrescentVector from '../../../images/crescent-vector.png';
import GrayStar from '../../../images/gray-star.png';
import GreenStar from '../../../images/green-star.png';
import HalfGreenStar from '../../../images/half-green-star.png';


const Analyze = () =>{
    const [active, setMode] = useState(false)
    const toggleMode = () =>{
      setMode(!active)
    }
    const [openPopup, setOpenPopup] = useState(false);

    return(
        <>
            <CompanyConfirmationPopup open= {openPopup} onClose={()=>setOpenPopup(false)}/>

            <div className="analysis">
                <h3 className="analysis-title">Análise</h3>
                <div className="stars">
                    <img src={GreenStar} alt="estrela verde"/>
                    <img src={GreenStar} alt="estrela verde"/>
                    <img src={GreenStar} alt="estrela verde"/>
                    <img src={GreenStar} alt="estrela verde"/>
                    <img src={GrayStar} alt="estrela verde"/>
                </div>

                <div className="vector-container">
                    <span>– 1,0</span>
                    <img className="vector" src={DecrescentVector} alt="Vetor descrescente"/>
                </div>
                <button className='btn-reanalysis' onClick={() => setOpenPopup(true)}>Reanálise</button>
            </div>
        </>
    )
}

const CompanyAnalyzes = () =>{
    return(
        <section className="company-analyzes-section">

            <h2 className='section-title'>Análises</h2>

            <div className='analysis-container'>
            <Analyze/>
            <Analyze/>
            <Analyze/>
            <Analyze/>
            <Analyze/>
            <Analyze/>

            </div>
                
        </section>

    );
}

export default CompanyAnalyzes;