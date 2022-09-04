import React from 'react';
import {useState} from 'react';
import './company-form.css';
import stamp from '../../../images/stamp.png';

var counter = 0;

const CompanyRegistrationForm = () => {
    const[selected, setSelected] = useState(false);
    const [stateRegistration, setStateRegistration] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChangeStateRegistration = event => {
        const result = event.target.value.replace(/[^0-9]/, '');
        setStateRegistration(result);
    };

    const handleChangeCnpj = event => {
        const result = event.target.value.replace(/[^0-9]/, '');
        setCnpj(result);
    };

    const handleChangeType = event => {
        const result = event.target.value;
        if(counter===0){
            setSelected(true);
            counter = 1;
        }
        setType(result);
        console.log(type)
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChangeEmail = event => {
        if (isValidEmail(event.target.value)) {
            setEmail(event.target.value);
        }
    };

    const handleChangePhoneNumber = event => {
        const result = event.target.value.replace(/[^0-9]/, '');
        setPhoneNumber(result);
    };

    return(
        <section className='company-form-section'>
            <div className="form-container">
                <h2 className="form-title">Cadastro</h2>

                <div className="form-div">
                    <form className="form">
                        <input className="input" type="text" placeholder="Digite o nome Fantasia " name="" id="" maxLength={100} />
                        
                        <input className="input" type="text" placeholder="Digite a Razão Social " name="" id="" maxLength={100}/>
                        
                        <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="" id="" maxLength={9} value={stateRegistration} onChange={handleChangeStateRegistration}/>
                        
                        <input className="input" type="text" placeholder="Digite o CNPJ" name="" id="" maxLength={14} value={cnpj} onChange={handleChangeCnpj}/>
                        
                        {/* Não está pegando o tipo em tempo real, e sim o tipo anterior a mudança */}
                        <select className={selected ? "select selected" : "select"} id="" onChange={handleChangeType}>
                            <option className="select-option" value="default" disabled selected>Selecione o tipo</option>
                            <option className="select-option" value="Primeiro Setor">Primeiro Setor</option>
                            <option className="select-option" value="Segundo Setor">Segundo Setor</option>
                            <option className="select-option" value="Terceiro Setor">Terceiro Setor</option>
                        </select>

                        <div className="password">
                            <input className="input last" type="password" placeholder="Digite uma senha" name="" id="" maxLength={100} />
                            
                            <input className="input last" type="password" placeholder="Confirme a sua senha" name="" id="passwordConfirmation" maxLength={100} />
                        </div>

                        <div className="contacts">
                            <input className="input last" type="text" placeholder="Digite o seu Telefone " name="" id="" maxLength={12} value={phoneNumber} onChange={handleChangePhoneNumber} />

                            <input className="input last" type="email" placeholder="Digite o seu email" name="" id=""maxLength={100}  onChange={handleChangeEmail}/>
                        </div>

                    </form>
                </div>

                <a href="#loginScreen" class="confirm">Confirmar</a>
            </div>

            <div className="stamp-container">
                <img className="stamp-img" src={stamp} alt="Selo de incentivo a reciclagem"/>
            </div>

        </section>
    );
}

export default CompanyRegistrationForm;