import React from 'react'
import './ContainerRegistration.css';

function Container() {
 
 
  return (
    <>
    <div className="cont">
        <div className="container">
          
          <form action="http://localhost:8000/analista/add" method='post'>
          <h2>Cadastro Analista</h2>
            <div className="field name field">
              <div className="input-field">
                <input type="username" placeholder="Insira seu nome de usuario" className="user_name" name ='username'/>
              </div>
            </div>
            <div className="field first_name field">
              <div className="input-field">
                <input type="first_name" placeholder="Insira seu primeiro nome" className="first_name" name ='first_name'/>
              </div>
            </div>
            <div className="field last_name field">
              <div className="input-field">
                <input type="last_name" placeholder="Insira seu ultimo nome" className="last_name" name ='last_name'/>
              </div>
            </div>
            <div className="field email-field">
              <div className="input-field">
                <input type="email" placeholder="Insira seu e-mail" className="email" name = 'email'/>
              </div>
            </div>
            <div className="field cpf field">
              <div className="input-field">
                <input type="CPF" placeholder="Insira seu CPF" className="CPF" name ='cpf'/>
              </div>
            </div>
            <div className="field specialty">
              <div className="input-field">
                <input type="specialty" placeholder="Insira a especialidade" className="specialty" name ='specialty'/>
              </div>
            </div>
            <div className="field create-password">
              <div className="input-field">
                <input type="password" placeholder="Crie uma senha" className="password" name = 'password'/>
                <i className="bx bx-hide show-hide" />
              </div>
            </div>
            <div className="input-field button">
            
              <input type="submit" defaultValue="Submit Now" />
              
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Container;