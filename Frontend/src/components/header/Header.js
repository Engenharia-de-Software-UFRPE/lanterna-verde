import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import './header.css'
import logo from '../../assets/logo-img.png'
import companyPicture from '../../assets/apple.png'

const Header = () =>{
    return(
        <header className="header">

        <div className="container">

          <a className="logo" href="#">
            <img className="logo-img" src={logo} alt="Imagem da Logo"/>

            <h1 className="logo-name">
              Lanterna <span>Verde</span>
            </h1>
          </a>

          <input className="search-bar" type="text" placeholder="Pesquisar" id=""/>

          <div className='hamburger'>
            
          </div>

          <div className='menu'>

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
                    <li><a className="btn teste" href="#">Solicitar análise</a></li>
                    <li><a className="btn b" href="#">Emitir relatório geral</a></li>
                    <li><a className="btn c" href="#">Receber recomendações</a></li>
                    <li><a className="btn d" href="#">Histórico de avaliações</a></li>
                </ul>
            </div>

          </div>
          

        </div>
          
      </header>

    );
}

export default Header;