import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './TelaDadosAnalista.css';

function TelaDadosAnalista() {
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
<body>
  <div class = "main">
  <div class="profile-card">
    <div class="card-header">
      <div class="pic">
        <img src="../imagens/robson.jpg" alt=""/>
      </div>
      <div class="name">Robson Pereira da Silva Alencar</div>
      <div class="desc">Analista Especialista</div>
      <div class="name">1281289178217</div>
      <div class="desc">CPF</div>
      <div class="name">robson_obrabo@gmail.com</div>
      <div class="desc">E-mail</div>
      <div class="name">Destuir os malvados</div>
      <div class="desc">Especialidade</div>
      
      <a href="#" class="contact-btn">Alterar Dados</a>
    </div>
    <div class="card-footer">
      <div class="numbers">
        
        <div class="border"></div>
        <div class="item">
          <span>7</span>
          Analises pendentes
        </div>
        <div class="border"></div>
        <div class="item">
          <span>35</span>
          Analises realizadas
        </div>
      </div>
    </div>
  </div>
  </div>
 
</body>
</>
  );
}

export default TelaDadosAnalista;


