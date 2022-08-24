import React, { useState, useEffect } from 'react';
import './TelaAnalista.css';
import { Link } from 'react-router-dom';
import './Analises'
import Analises from './Analises.js';
import Noticias from './Noticias';

const Perfil = () => {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  const linkStyle = {
    textDecoration: "none",
  };
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

  const [analises] = useState([
    {
      empresa :'Empresa 1',
      score : 2.4,
      finalizada: false,
    },
    {
      empresa : 'Empresa 2',
      score : 1.1,
      finalizada: false,
    }

  ])

  const [noticias] = useState([
    {
      titulo :'Empresa 1 está numa fria!',
      preview : "Empresa 1 foi descmascarada e está sendo processada por greenwashing",
      conteudo: "Blablalbalblablalbalblalblalblalblablalblalbalblablalblablablablalblalbalb",
    },
    {
      titulo :'Empresa 2 é a melhor do ramo!',
      preview : "Empresa 2 é boa pra chuchu, muito legal e verde :D",
      conteudo: "Blablalbalblablalbalblalblalblalblablalblalbalblablalblablablablalblalbalbabcksdksakjwnntsllgofsdk",
    }

  ])

  return (
    <div>
      <div className="main">
        <nav>
        <Link  style={linkStyle}
              to='/'
              onClick={closeMobileMenu}
              >
              <div className="icon">Lanterna <b style={{color: 'rgb(22, 182, 44)'}}>Verde</b> <img src="../imagens/gl.png" alt="" /></div>
        </Link>
          <div className="searchbox">
            <input type="search" placeholder="Pesquise por analises de uma empresa " />
            <span className="fa fa-search" />
          </div>
          <div className="analista" href="perfil.html">
            ROBSON
            <img src="../imagens/robson.jpg" />
          </div>
          <button onclick="openNav()">☰</button>
          <div id="mySidebar" className="sidebar">
            <a href="#" className="closebtn" onclick="closeNav()">×</a>
            <a href="#">Alterar Perfil</a>
            <a href="#">Ver Minhas Análises</a>
            <a href="#">Alguma coisa</a>
            <a href="#">Outra Coisa</a>
          </div>
        </nav>
      </div>
      <div className='conteudo'>
        <div className='coluna'>
          <h1>Analises Pendentes:</h1>
          <Analises analises={analises}/>
        </div>

        <div className='coluna'>
          <h1>Noticias:</h1>
          <Noticias noticias={noticias}/>
        </div>

      </div>
    </div>
  );
}

export default Perfil;
