import React, { useState } from 'react';
import './company-payment-form.css';
export default function Payment() {
    const [modal, setModal] = useState(false);
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    return (
      <>
      <p>Clique aqui :D</p>
        <button onClick={toggleModal} className="btn-modal">
          Open
        </button>
        {modal && (
          
          <div className="modal">
            <div className='payment-wrapper'>
              <form className='payment-form'>
                <div className='payment-title'>
                  <a>Pagamento</a>
                </div>
                <input type = "text" name ="CPNJ" placeholder='CPNJ'></input>
              </form>
              <form className='payment-form'>
                <input type = "text" name ="Servico" placeholder='Servico'></input>
              </form>
              <form className='payment-button'>
                <input type="button" value="confirmar" accesskey="s" ></input>
              </form>

            </div>

          </div>
        )}
      </>
    );
  }