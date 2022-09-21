import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './company-confirmation-popup.css';

const CompanyConfirmationPopup = ({open, onClose, analysisId}) => {
    const [modal, setModal] = useState({open});
    const [reanalyzed, setReanalyzed] = useState(true)
    
    const sendPutRequest = async () => {
        await axios.put(`http://localhost:8000/empresa/analise/${analysisId}/solicitar-reanalise`,{reanalyzed} , { withCredentials: true })
        .then(res=>{
            console.log(res.data)
            alert("Reanálise solicitada com sucesso")
        })
        .catch( error=>{
            alert("Erro")
        })
    };

    if(!open) return null;
    else return(
        <section className='company-confirmation-popup-section'>
            <div className='popup-container'>

                <h3 className="popup-title">Confirmação</h3>
                <p className='popup-text'>Deseja confirmar a solicitação ?</p>
                <div className='popup-buttons'>
                    <a href="#" className="btn" onClick={onClose} onClickCapture={sendPutRequest} >Confirmar</a>
                    <a href="#" className="btn cancel" onClick={onClose}>Cancelar</a>
                </div>
            </div>
        </section>
    );
}

export default CompanyConfirmationPopup;