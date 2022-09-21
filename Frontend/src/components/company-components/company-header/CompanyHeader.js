import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './company-header.css';
import logo from '../../../images/logo-img.png';
import companyPicture from '../../../images/apple.png';
import CompanyConfirmationPopup from '../company-confirmation-popup/CompanyConfirmationPopup'

const CompanyHeader = ({newButton}) =>{
    const [active, setMode] = useState(false)
    const [rankingEmpresa, setRankingEmpresa] = useState(0)
    const toggleMode = () =>{
      setMode(!active)
    }
    const [openPopup, setOpenPopup] = useState(false);

    const sendGetRequest = async () => {
      await axios.get('http://localhost:8000/empresa/ranking', { withCredentials: true })
      .then(res => {
          let data = res.data;
          setRankingEmpresa(data['Ranking'])                     
      })
      .catch( error=>{
          alert("Erro")
      })
    }

    useEffect( () => {
      sendGetRequest();
    }, []);

    return(
      <div className="company-header-container">
        <CompanyConfirmationPopup open= {openPopup} isAnalysis={true} onClose={()=>setOpenPopup(false)}/>

        <a className="logo" href="/CompanyMainScreen">
          <img className="logo-img" src={logo} alt="Imagem da Logo"/>

          <h1 className="logo-name">
            Lanterna <div>Verde</div>
          </h1>
        </a>

        <input className="search-box" type="text" placeholder="Pesquisar" id=""/>

        <div className={active ? "icon icon-active" : "icon"} onClick={toggleMode}>
          <div className='hamburger hamburger-icon'></div>
        </div>

        <div className={active ? "not-menu menu-open" : "not-menu menu-close" }></div>
        
        <div className={active ? "menu menu-open" : "menu menu-close" }>
          <div className="company-logged-in">
              <div>
                <img className="company-img" src={companyPicture} alt="Foto de perfil da empresa logada"/>
              </div>
              <div className="company-info">
                  <h3 className="company-name">Apple</h3>
                  <h4 className="company-position">{rankingEmpresa}ª posição no ranking</h4>
                  <h4 className="company-category">Tecnologia</h4>
              </div>
          </div>

          <div className="menu-buttons">
              <ul>
                  <li><a className="btn" href="/CompanyMainScreen/ProfileChange">Editar Perfil</a></li>
                  <li><a className="btn" href="#" onClick={() => setOpenPopup(true)}>Solicitar análise</a></li>
                  <li><a className="btn" href="/CompanyMainScreen/CompanyReport">Emitir relatório geral</a></li>
                  <li><a className="btn" href="#">Receber recomendações</a></li>
                  <li><a className="btn" href="#">Histórico de avaliações</a></li>
                  <li>{newButton}</li>
                  <li><a className="btn exit" href="/">Sair</a></li>
              </ul>
          </div>

        </div>
        

      </div>

    );
}

export default CompanyHeader;