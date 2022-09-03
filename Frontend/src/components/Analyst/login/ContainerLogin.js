
import react, { Component }  from 'react';
import { Navigate } from 'react-router-dom';
import './ContainerLogin.css';

function Container() {
 
  // function teste() {
  //   window.location.href="/analysisScreen"; 
  // }
 
  return (
    <>
    <div className="cont">
        <div className="container">
          <header>Login</header>
          <form action="http://localhost:8000/login" method='post' 
          // onSubmit={teste} 
          //  target='dummyframe'
           >
            <div className="field name field">
              <div className="input-field">
                <input type="username" placeholder="Insira seu Nome" className="username" name ='username'/>
              </div>
              <span className="error name-error">
                <i className="bx bx-error-circle error-icon" />
                <p className="error-text">Por favor, insira um nome valido</p>
              </span>
            </div>
            <div className="field create-password">
              <div className="input-field">
                <input type="password" placeholder="Insira sua senha" className="password" name = 'password'/>
                <i className="bx bx-hide show-hide" />
              </div>
              
            </div>
           
            <div className="input-field button">
            
              <input type="submit" defaultValue="Submit Now" />
             
              
            </div>
          </form>
        </div>
        {/* <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe> */}
      </div>
    </>
  );
}

export default Container;