import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './company-form.css';
import stamp from '../../../images/stamp.png';

const CompanyRegistrationForm = () => {
    const [company, setCompany] = useState({
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
    const[selected, setSelected] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    

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
                setSelected(true);
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

    const handlePasswordConfirmation = (event) =>{
        const result = event.target.value;
        setPasswordConfirmation(result);
    }

    function isValidEmail(email) {
        return (/\S+@\S+\.\S+/.test(email));
    }

    const sendPostRequest = async () => {
        const data = JSON.stringify(company);
        
        await axios.post('http://127.0.0.1:8000/empresa/add', company)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch( error=>{
            console.log(error);
        })
    };


    const confirm = (event) =>{
        if(passwordConfirmation !== company.password){
            //console.log("password");
        }

        if(!isValidEmail(company.email)){
            //console.log("email")
        }

        sendPostRequest();
    }


    return(
        <section className='company-form-section'>
            <div className="form-container">
                <h2 className="form-title">Cadastro</h2>

                <div className="form-div">
                    <form className="form">
                        <input className="input" type="text" placeholder="Digite o username " name="username" maxLength={100} onChange={handleInputChange} />

                        <input className="input" type="text" placeholder="Digite o nome Fantasia " name="tradeName" maxLength={100} onChange={handleInputChange} />
                        
                        <input className="input" type="text" placeholder="Digite a Razão Social " name="corporateName" maxLength={100}
                        onChange={handleInputChange} />
                        
                        <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="stateRegistration" maxLength={9} value={company.stateRegistration} onChange={handleInputChange}/>
                        
                        <input className="input" type="text" placeholder="Digite o CNPJ" name="cnpj" maxLength={14} value={company.cnpj} onChange={handleInputChange}/>
                        
                        <select className={selected ? "select selected" : "select"} name="type" onChange={handleInputChange}>
                            <option className="select-option" value="default" disabled selected>Selecione o tipo</option>
                            <option className="select-option" value="Primeiro Setor">Primeiro Setor</option>
                            <option className="select-option" value="Segundo Setor">Segundo Setor</option>
                            <option className="select-option" value="Terceiro Setor">Terceiro Setor</option>
                        </select>
                        
                        <input className="input" type="email" placeholder="Digite o seu email" name="email" maxLength={100} onChange={handleInputChange}/>
                        
                        <input className="input" type="text" placeholder="Digite o seu Telefone " name="phoneNumber" maxLength={12} value={company.phoneNumber} onChange={handleInputChange} />

                        <div className="password" on>
                            <input className="input last" type="password" placeholder="Digite uma senha" name="password" maxLength={100} onChange={handleInputChange} />
                            
                            <input className="input last" type="password" placeholder="Confirme a sua senha" name="passwordConfirmation" maxLength={100} onChange={handlePasswordConfirmation} />
                        </div>

                    </form>
                </div>

                <a href="#loginScreen" class="confirm" onClick={confirm}>Confirmar</a>
            </div>

            <div className="stamp-container">
                <img className="stamp-img" src={stamp} alt="Selo de incentivo a reciclagem"/>
            </div>

        </section>
    );
}

export default CompanyRegistrationForm;