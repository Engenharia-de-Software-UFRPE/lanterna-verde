import React, { useState } from 'react';
import './company-payment-form.css';

const CompanyPaymentForm = ({open, onClose}) =>{
  const [modal, setModal] = useState({open});
  const [cnpj, setCnpj] = useState('');

  const handleChangeCnpj = event => {
    const result = event.target.value.replace(/[^0-9]/, '');
    setCnpj(result);
};


  if(!open) return null;
  else return (
    <>
        <div className="company-payment-form-modal">
          <div className='payment-wrapper'>
            <h2 className='payment-title'>Pagamento</h2>
            
            <form className='payment-form'>
              <input className='input' type= "text" name ="CPNJ" placeholder='CPNJ'  maxLength={14} value={cnpj} onChange={handleChangeCnpj}></input>
              <input className='input' type= "text" name ="Serviço" placeholder='Servico'></input>
            </form>

            <div className='buttons'>
              <input className='btn' type="button" value="Confirmar" onClick={onClose}></input>
              <input className='btn cancel' type="button" value="Cancelar" onClick={onClose}></input>
            </div>

          </div>

        </div>
    </>
  )
}

export default CompanyPaymentForm;
