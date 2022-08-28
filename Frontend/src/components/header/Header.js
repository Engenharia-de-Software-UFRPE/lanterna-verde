import React from 'react';
import {useState} from 'react'
import './header.css'
import logo from '../../assets/logo-img.png'
import companyPicture from '../../assets/apple.png'

const Header = () =>{

    const [active, setMode] = useState(false)
    const toggleMode = () =>{
      setMode(!active)
    }


    return(

      <header className="header">

        <div className="container">

          <a className="logo" href="#">
            <img className="logo-img" src={logo} alt="Imagem da Logo"/>

            <h1 className="logo-name">
              Lanterna <span>Verde</span>
            </h1>
          </a>

          <input className="search-box" type="text" placeholder="Pesquisar" id=""/>

          <div className={active ? "icon icon-active" : "icon"} onClick={toggleMode}>
            <div className='hamburger hamburger-icon'></div>
          </div>

          <div className={active ? "menu menu-open" : "menu menu-close" }>

            <div className="company-logged-in">
                <div className='teste'>
                  <img className="company-img" src={companyPicture} alt="Foto de perfil da empresa logada"/>
                </div>
                <div className="company-info">
                    <h3 className="company-name">Apple</h3>
                    <h4 className="company-position">4ª posição no ranking</h4>
                    <h4 className="company-category">Tecnologia</h4>
                </div>
            </div>

            <div className="buttons">
                <ul>
                    <li><a className="btn" href="#">Solicitar análise</a></li>
                    <li><a className="btn" href="#">Emitir relatório geral</a></li>
                    <li><a className="btn" href="#">Receber recomendações</a></li>
                    <li><a className="btn" href="#">Histórico de avaliações</a></li>
                </ul>
            </div>

          </div>
          

        </div>
          
      </header>

    );
}

export default Header;