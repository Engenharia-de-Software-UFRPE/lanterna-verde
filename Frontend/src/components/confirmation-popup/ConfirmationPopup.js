import React from 'react';
import './confirmation-popup.css';

const ConfirmationPopup = () => {
    return(
        <section className='popup-section'>
            <div className='popup-container'>

                <h3 className="popup-title">Confirmação</h3>
                <p className='popup-text'>Deseja confirmar a solicitação ?</p>
                <div className='popup-buttons'>
                    <a href="#" className="btn">Confirmar</a>
                    <a href="#" className="btn cancel">Cancelar</a>
                </div>
            </div>
        </section>
    );
}

export default ConfirmationPopup;