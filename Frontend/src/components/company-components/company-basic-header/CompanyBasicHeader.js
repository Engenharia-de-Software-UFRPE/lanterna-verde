import React from 'react';
import './company-basic-header.css';
import logo from '../../../images/logo-img.png';

const CompanyBasicHeader = () =>{
    return(
      <div className="company-basic-header-container">

        <a className="logo" href="/">
          <img className="logo-img" src={logo} alt="Imagem da Logo"/>

          <h1 className="logo-name">
            Lanterna<div>Verde</div>
          </h1>
        </a>

        <a className="login" href="#loginScreen">Login</a>

      </div>
    );
}

export default CompanyBasicHeader;