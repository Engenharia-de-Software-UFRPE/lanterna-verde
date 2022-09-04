import React from 'react';
import { useState } from 'react';
import './company-confirmation-popup.css';

const CompanyConfirmationPopup = ({open, onClose}) => {
    const [modal, setModal] = useState({open});

    if(!open) return null;
    else return(
        <section className='company-confirmation-popup-section'>
            <div className='popup-container'>

                <h3 className="popup-title">Confirmação</h3>
                <p className='popup-text'>Deseja confirmar a solicitação ?</p>
                <div className='popup-buttons'>
                    <a href="#" className="btn" onClick={onClose}>Confirmar</a>
                    <a href="#" className="btn cancel" onClick={onClose}>Cancelar</a>
                </div>
            </div>
        </section>
    );
}

export default CompanyConfirmationPopup;