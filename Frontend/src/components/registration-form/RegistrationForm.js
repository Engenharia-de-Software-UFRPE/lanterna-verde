import React from 'react';
import {useState} from 'react'
import './form.css'
import stamp from '../../assets/stamp.png'

var counter = 0;

const RegistrationForm = () => {
    const [selected, setMode] = useState(false)
    const changeMode = () =>{
        console.log(counter);
        if(counter===0){
            setMode(true);
            counter = 1;
        }
    }
    return(
        <section className='form-section'>
            <div className="form-container">
                <h2 className="form-title">Cadastro</h2>

                <div className="form-div">
                    <form className="form">
                        <input className="input" type="text" placeholder="Digite o nome Fantasia " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite a Razão Social " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite o CNPJ" name="" id=""/>

                        <select className={selected ? "select selected" : "select"} onChangeCapture={changeMode} id="">
                            <option className="select-option" value="" disabled selected>Selecione o segmento</option>
                            <option className="select-option" value="">Indústria</option>
                            <option className="select-option" value="">Comércio</option>
                            <option className="select-option" value="">Serviços</option>
                        </select>

                        <div className="password">
                            <input className="input last" type="password" placeholder="Digite uma senha" name="" id=""/>
                            <input className="input last" type="password" placeholder="Confirme a sua senha" name="" id=""/>
                        </div>
                        <div className="contacts">
                            <input className="input last" type="text" placeholder="Digite o seu Telefone " name="" id=""/>
                            <input className="input last" type="text" placeholder="Digite o seu email" name="" id=""/>
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

export default RegistrationForm;