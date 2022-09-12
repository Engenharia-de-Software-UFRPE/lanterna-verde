import React, { useState, useEffect } from 'react';
import './AnalystScreen.css';
import { Link } from 'react-router-dom';
import AnalysisMap from '../analysis/AnalysisMap.js';
import NewsList from '../analysis/NewsList';

const Profile = () => {

  

  const [analysis] = useState([
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

  const [news] = useState([
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
        <Link  
              to='/'
              >
              <div className="icon">Lanterna <b style={{color: 'rgb(22, 182, 44)'}}>Verde</b> <img src="../images/gl.png" alt="" /></div>
        </Link>
          <div className="searchbox">
            <input type="search" placeholder="Pesquise por analises de uma empresa " />
            <span className="fa fa-search" />
          </div>
          <div className="analista" href="perfil.html">
            ROBSON
            <img src="../images/robson.jpg" />
          </div>
          
        </nav>
      </div>
      <div className='conteudo'>
        <div className='coluna'>
          <h1>Analises Pendentes:</h1>
          <AnalysisMap analysis={analysis}/>
        </div>

        <div className='coluna'>
          <h1>Noticias:</h1>
          <NewsList news={news}/>
        </div>

      </div>
    </div>
  );
}

export default Profile;
