import React from 'react';
import './company-profile-change.css';
import {useState} from 'react';
import axios from 'axios';
import testeprojeto from '../../../images/testeprojeto.png';
const CompanyProfileChange = () => {
    return (
        <section className='company-profile-change'>
            <div className='comapany-container-profile-change'>
                <h2 className='form-title-profile-change'>Editar Perfil</h2>
                <div className='stamp-container'>
                    <img className="testeprojeto" src={testeprojeto} alt="Imagem da empresa"/>
                </div>
                <div className='form-div-profile-change'>
                    <form className='form-profile-change'>
                         <input className="input" type="text" placeholder="Digite o username " name="username" maxLength={100}/* onChange={handleInputChange}*/ />
    
                            <input className="input" type="text" placeholder="Digite o nome Fantasia " name="tradeName" maxLength={100}/* onChange={handleInputChange}*/ />
                            
                            <input className="input" type="text" placeholder="Digite a Razão Social " name="corporateName" maxLength={100}
                            /*onChange={handleInputChange}*/ />
                            <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="stateRegistration" maxLength={9} /*value={company.stateRegistration} onChange={handleInputChange}*//>
                            
                            <input className="input" type="text" placeholder="Digite o CNPJ" name="cnpj" maxLength={14}/* value={company.cnpj} onChange={handleInputChange}*/np/>
                    </form>
                </div>
            </div>
        </section>
      )
    }
    
    export default CompanyProfileChange;
    
    /*
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

        alert("Cadastro efetuado com sucesso")
        setCompany({
            username: "",
            email: "",
            password: "",
            tradeName: "",
            corporateName: "",
            stateRegistration: "",
            cnpj: "",
            type: "",
            phoneNumber: ""
        })
    }

*/



