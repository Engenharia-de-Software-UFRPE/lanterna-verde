import React, { useEffect, useState } from 'react';
import './company-profile-change.css';
import axios from 'axios';
import companyImage from '../../../images/testeprojeto.png';

const CompanyProfileChange = () => {
    const [company, setCompany] = useState({
        oldUsername: "",
        username: "",
        email: "",
        password: "",
        tradeName: "",
        corporateName: "",
        stateRegistration: "",
        cnpj: "",
        type: "",
        phoneNumber: ""
    });

    const sendGetRequest = async () => {
        await axios.get('http://localhost:8000/user/empresa', { withCredentials: true })
        .then(res => {
            let data = res.data;           
            setCompany({
                oldUsername: data.Usuario.username,
                username: data.Usuario.username,
                email: data.Usuario.email,
                password: "",
                tradeName: data.Empresa.tradeName,
                corporateName: data.Empresa.corporateName,
                stateRegistration: data.Empresa.stateRegistration,
                cnpj: data.Empresa.cnpj,
                type: data.Empresa.tipo,
                phoneNumber: data.Empresa.phoneNumber
            })           
        })
        .catch( error=>{
            alert("Erro")
        })
    };

    const sendPutRequest = async () => {
        await axios.put('http://localhost:8000/empresa/update', company, { withCredentials: true })
        .then(res=>{
            console.log(res.data)
            alert("Dados alterados com sucesso")
        })
        .catch( error=>{
            alert("Erro")
        })
    };

    useEffect( () => {
        sendGetRequest();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name==='stateRegistration' ||
        name==='cnpj' || name ==='phoneNumber'){
            const result = event.target.value.replace(/[^0-9]/, '');
            setCompany({
                ...company,
                [name]: result,
            });
        }
        else if (name === 'type'){
            if(value!==''){
                setCompany({
                    ...company,
                    [name]: value,
                });
            }
        }
        else{
            setCompany({
                ...company,
                [name]: value,
            });
        }
    };

    function isValidEmail(email) {
        return (/\S+@\S+\.\S+/.test(email));
    }

    const confirm = (event) =>{

        if(isValidEmail(company.email)){
            sendPutRequest()
        }
        else{
            alert("ERRO")
        }
    }
    

    return (
        <section className='company-profile-change'>
            <div className='company-container-profile-change'>
                <h2 className='form-title-profile-change'>Editar Perfil</h2>
                <div className='company-img-container'>
                    <img className="company-img" src={companyImage} alt="Imagem da empresa"/>
                </div>
                <div className='form-div-profile-change'>
                    <form className='form-profile-change'>
                        <input className="input" type="text" placeholder="Digite o username " name="username" maxLength={100} onChange={handleInputChange} value={company.username} />

                        <input className="input" type="text" placeholder="Digite o nome Fantasia " name="tradeName" maxLength={100} onChange={handleInputChange} value={company.tradeName}/>

                        <input className="input" type="text" placeholder="Digite a Razão Social " name="corporateName" maxLength={100} onChange={handleInputChange} value={company.corporateName}/>

                        <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="stateRegistration" maxLength={9} onChange={handleInputChange} value={company.stateRegistration}/>

                        <input className="input" type="text" placeholder="Digite o CNPJ" name="cnpj" maxLength={14} onChange={handleInputChange} value={company.cnpj}/>

                        <select className='select selected' name="type" onChange={handleInputChange} value={company.type}>
                            <option className="select-option" value="" disabled selected>Selecione o tipo</option>
                            <option className="select-option" value="Primeiro Setor">Primeiro Setor</option>
                            <option className="select-option" value="Segundo Setor">Segundo Setor</option>
                            <option className="select-option" value="Terceiro Setor">Terceiro Setor</option>
                        </select>

                        <input className="input" type="email" placeholder="Digite o seu email" name="email" maxLength={100} onChange={handleInputChange} value={company.email}/>

                        <input className="input" type="text" placeholder="Digite o seu Telefone " name="phoneNumber" maxLength={12} onChange={handleInputChange} value={company.phoneNumber}/>

                        
                        <input className="input last" type="password" placeholder="Digite uma senha" name="password" maxLength={100} onChange={handleInputChange} value={company.password} />
                            
                    </form>
                </div>
                <div className='buttons'>
                    <input className='btn' type="button" value="Confirmar" onClick={confirm}></input>
                    <input className='btn cancel' type="button" value="Cancelar" onClick={sendGetRequest}></input>
                </div>
            </div>
        </section>
      )
    }
    
    export default CompanyProfileChange;
    



