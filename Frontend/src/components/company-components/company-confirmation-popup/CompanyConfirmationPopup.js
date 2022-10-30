import React from 'react';
import { useState, useEffect } from 'react';
import {postRequestAnalysis, putRequestReanalysis} from '../../../requests/CompanyRequests'
import axios from 'axios'
import './company-confirmation-popup.css';

const CompanyConfirmationPopup = ({open, onClose, analysisId, isAnalysis}) => {
    const [modal, setModal] = useState({open});

    const requestReanalysis = async () => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        await axios.get(`http://localhost:8000/empresa/analise/${analysisId}`, { withCredentials: true })
        .then(res=>{
            let data = res.data
            if((data['Solicitacao'].reanalysis) == false){
                putRequestReanalysis(analysisId)
            }else alert("Já existe uma solicitação de análise em andamento")
        })
        .catch( error=>{
            alert("erro")
        })
    };

    const requestAnalysis = async () => {
        await postRequestAnalysis()
    };

    if(!open) return null;
    else return(
        <section className='company-confirmation-popup-section'>
            <div className='popup-container'>

                <h3 className="popup-title">Confirmação</h3>
                <p className='popup-text'>Deseja confirmar a solicitação ?</p>
                <div className='popup-buttons'>
                    <a href="#" className="btn" onClick={onClose} onClickCapture={isAnalysis ? requestAnalysis : requestReanalysis} >Confirmar</a>
                    <a href="#" className="btn cancel" onClick={onClose}>Cancelar</a>
                </div>
            </div>
        </section>
    );
}

export default CompanyConfirmationPopup;