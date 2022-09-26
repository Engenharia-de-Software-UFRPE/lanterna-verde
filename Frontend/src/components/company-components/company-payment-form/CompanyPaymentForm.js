import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './company-payment-form.css';

const CompanyPaymentForm = ({open, onClose, packageSelected }) =>{
  const [modal, setModal] = useState({open});
  const [cnpj, setCnpj] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('')
  const [packageType, setPackageType] = useState(packageSelected)

  useEffect(() => {
    getLoggedCompany()
  }, [])
  
  const sendPutRequest = async () => {
      await axios.put('http://localhost:8000/empresa/assign-package', JSON.stringify(packageSelected), { withCredentials: true })
      .then(res=>{
          console.log(res.data)
          alert("Assinatura confirmada com sucesso")
      })
      .catch( error=>{
          alert("Erro")
      })
  };

  const getLoggedCompany = async () => {
    await axios.get('http://localhost:8000/user/empresa', { withCredentials: true })
    .then(res => {
        let data = res.data;       
        setCompanyCnpj(data.Empresa.cnpj)  
    })
    .catch( error=>{
        alert("Erro")
    })
  };

  const handleChangeCnpj = event => {
    const result = event.target.value.replace(/[^0-9]/, '');
    setCnpj(result);
  };

  const confirm = () => {
    if(cnpj === companyCnpj){
      sendPutRequest()
    }
    else{
      alert('CNPJ INCORRETO')
    }
    setCnpj('')
  }

  const cancel = () => {
    setCnpj('')
  }

  if(!open) return null;
  else return (
    <>
        <div className="company-payment-form-modal">
          <div className='payment-wrapper'>
            <h2 className='payment-title'>Pagamento</h2>
            
            <form className='payment-form'>
              <input className='input' type= "text" name ="Serviço" placeholder='Servico' value ={packageSelected} ></input>
              <input className='input' type= "text" name ="CPNJ" placeholder='CPNJ'  maxLength={14} value={cnpj} onChange={handleChangeCnpj}></input>
            </form>

            <div className='buttons'>
              <input className='btn' type="button" value="Confirmar" onClick={onClose} onClickCapture={confirm}></input>
              <input className='btn cancel' type="button" value="Cancelar" onClick={onClose} onClickCapture={cancel}></input>
            </div>

          </div>

        </div>
    </>
  )
}

export default CompanyPaymentForm;
