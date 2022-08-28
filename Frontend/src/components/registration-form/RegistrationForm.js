import React from 'react';
import './form.css'
import stamp from '../../assets/stamp.png'

const RegistrationForm = () => {
    return(
        <div className="main">
            <section className="form-section">
                <h2 className="form-title">Cadastro</h2>

                <div className="form-container">
                    <form className="form">
                        <input className="input" type="text" placeholder="Digite o nome Fantasia " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite a Razão Social " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite Inscrição Estadual " name="" id=""/>
                        <input className="input" type="text" placeholder="Digite o CNPJ" name="" id=""/>

                        <select className=" select" id="">
                            <option className="select-option default" value="" disabled selected>Selecione o segmento</option>
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
            </section>

            <section className="stamp-section">
                <img className="stamp-img" src={stamp} alt="Selo de incentivo a reciclagem"/>
            </section>

        </div>
    );
}

export default RegistrationForm;