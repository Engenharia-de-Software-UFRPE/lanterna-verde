import React from 'react';
import './basic-header.css'
import logo from '../../assets/logo-img.png'

const BasicHeader = () =>{
    return(
      <div className="container">

        <a className="logo" href="#">
          <img className="logo-img" src={logo} alt="Imagem da Logo"/>

          <h1 className="logo-name">
            Lanterna <span>Verde</span>
          </h1>
        </a>

        <a className="login" href="#loginScreen">Login</a>

      </div>
    );
}

export default BasicHeader;