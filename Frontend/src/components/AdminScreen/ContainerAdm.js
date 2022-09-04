import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContainerAdm.css';
import Tableadmin from './ResquestTable.js';


function ContainerAdm() {
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

    <div className='admBoard-container'>
      <div id="admBoard">

        <div id="admPhoto">
          <img src="../images/testeprojeto.png" alt="" class="photo" />
        </div>

        <div id="nameAdmArea">
          <h6 class="nameAdmTitle">Seu nome:</h6>
          <h6 class="nameAdm">Nome do administrador</h6>
        </div>
        <div id="usernameAdmArea">
          <h6 class="usernameAdmTitle">Username:</h6>
          <h6 class="usernameAdm">Username do administrador</h6>
        </div>

        <button type="button" class="btnMinhaConta">Minha Conta</button>
        <button type="button" class="btnConfiguracoes">Configurações</button>
        <button type="button" class="btnCadastrarAnalista">Cadastrar Analista</button>
        <button type="button" class="btnQuestionario">Ver Questionário</button>
        <button type="button" class="btnHistoricoDeAnalises">Histórico de Análises</button>

      </div>


      <Tableadmin></Tableadmin>
    </div>
    </>
  );
}


export default ContainerAdm;