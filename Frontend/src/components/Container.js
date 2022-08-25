import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Container.css';

function Container() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

 
  return (
    <>
<div className="cont">
        <div className="container">
          <header>Cadastro</header>
          <form action="http://localhost:8000/criar_analista" method='post'>
            <div className="field name field">
              <div className="input-field">
                <input type="username" placeholder="Insira seu Nome" className="username" name ='username'/>
              </div>
              <span className="error name-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Por favor, insira um nome valido</p>
              </span>
            </div>
            <div className="field email-field">
              <div className="input-field">
                <input type="email" placeholder="Insira seu e-mail" className="email" name = 'email'/>
              </div>
              <span className="error email-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Please enter a valid email</p>
              </span>
            </div>
            <div className="field cpf field">
              <div className="input-field">
                <input type="CPF" placeholder="Insira seu CPF" className="CPF" name ='cpf'/>
              </div>
              <span className="error email-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Por favor, insira um CPF valido</p>
              </span>
            </div>
            <div className="field specialty">
              <div className="input-field">
                <input type="specialty" placeholder="Insira a especialidade" className="specialty" name ='specialty'/>
              </div>
              <span className="error email-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Por favor, insira um CPF valido</p>
              </span>
            </div>
            <div className="field create-password">
              <div className="input-field">
                <input type="password" placeholder="Crie uma senha" className="password" name = 'password'/>
                <i className="bx bx-hide show-hide" />
              </div>
              <span className="error password-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">
                  Please enter atleast 8 charatcer with number, symbol, small and
                  capital letter.
                </p>
              </span>
            </div>
            <div className="field confirm-password">
              <div className="input-field">
                <input type="password" placeholder="Confirme sua senha" className="cPassword" />
                <i className="bx bx-hide show-hide" />
              </div>
              <span className="error cPassword-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Password don't match</p>
              </span>
            </div>
            <div className="input-field button">
            <Link
              to='/dadosAnalista'
              onClick={closeMobileMenu}
              >
              <input type="submit" defaultValue="Submit Now" />
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Container;