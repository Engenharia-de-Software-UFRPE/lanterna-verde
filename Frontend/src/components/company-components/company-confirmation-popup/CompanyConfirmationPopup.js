import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './company-confirmation-popup.css';

const CompanyConfirmationPopup = ({open, onClose, analysisId, isAnalysis}) => {
    const [modal, setModal] = useState({open});
    const [analysisReanalyzed, setAnalysisReanalyzed] = useState(false)

    const requestReanalysis = async () => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        await axios.get(`http://localhost:8000/empresa/analise/${analysisId}`, { withCredentials: true })
        .then(res=>{
            let data = res.data
            if((data['Solicitacao'].reanalysis) == false){
                axios.put(`http://localhost:8000/empresa/analise/${analysisId}/solicitar-reanalise`,{analysisReanalyzed} , { withCredentials: true })
                .then(res=>{
                    alert("Reanálise solicitada com sucesso")
                })
                .catch( error=>{
                    alert("Erro")
                })
            }else alert("Já existe uma solicitação de análise em andamento")
        })
        .catch( error=>{
            alert("erro")
        })
    };

    const requestAnalysis = async () => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        await axios.post('http://localhost:8000/solicitacoesAnalise/add', '',{ withCredentials: true })
        .then(res => {
            let data = res.data;
            console.log(data)
            alert("Análise solicitada com sucesso")
        })
        .catch( error=>{
            alert("Já existe uma solicitação de análise em andamento")
        })
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