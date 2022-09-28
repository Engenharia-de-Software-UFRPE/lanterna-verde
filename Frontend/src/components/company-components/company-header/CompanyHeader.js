import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './company-header.css';
import logo from '../../../images/logo-img.png';
import companyPicture from '../../../images/apple.png';
import CompanyConfirmationPopup from '../company-confirmation-popup/CompanyConfirmationPopup'

const CompanyHeader = ({newButton}) =>{
    const [active, setMode] = useState(false)
    const toggleMode = () =>{
      setMode(!active)
    }
    const [openPopup, setOpenPopup] = useState(false);
    const [company, setCompany] = useState({
      tradeName: "",
      cnpj: "",
      type: "",
    });
    const [ranking, setRanking] = useState([])
    const [logout,setLogout] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
      getLoggedCompany()
      getRanking()
    }, [active]);

    const getRanking = async () => {
      await axios.get('http://localhost:8000/empresa/ranking', { withCredentials: true })
      .then(res => {
          let empresas = res.data['Empresas'];
          setRanking(empresas)
      })
      .catch( error=>{
          alert("Erro")
      })
    }

    const getLoggedCompany = async () => {
      await axios.get('http://localhost:8000/user/empresa', { withCredentials: true })
      .then(res => {
          let data = res.data;
            setCompany({
                tradeName: data.Empresa.tradeName,
                cnpj: data.Empresa.cnpj,
                type: data.Empresa.tipo,
            })        
      })
      .catch( error=>{
          alert("Erro")
      })
    };

    const handleLogout = async (username, password) => {
      axios.defaults.withCredentials = true;
      await axios.get("http://localhost:8000/logout",{ withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate('/');
        localStorage.clear();
        setLogout(true);
      });
    }

    const setRankingEmpresa = () =>{
      let rankingEmpresa = 0
      for(let i = 0; i< ranking.length;i++){
        if (ranking[i].cnpj === company.cnpj){
          rankingEmpresa = i+1
        }
      }
      return rankingEmpresa
    }

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
                  <h3 className="company-name">{company.tradeName}</h3>
                  <h4 className="company-position">{setRankingEmpresa()}ª posição no ranking</h4>
                  <h4 className="company-type">{company.type}</h4>
              </div>
          </div>

          <div className="menu-buttons">
              <ul>
                  <li><a className="btn" href="/CompanyMainScreen/ProfileChange">Editar Perfil</a></li>
                  <li><a className="btn" href="#" onClick={() => setOpenPopup(true)}>Solicitar análise</a></li>
                  <li><a className="btn" href="/CompanyMainScreen/CompanyReport">Emitir relatório geral</a></li>
                  <li>{newButton}</li>
                  <li><a className="btn exit" onClick={handleLogout}>Sair</a></li>
              </ul>
          </div>
        </div>
      </div>
    );
}

export default CompanyHeader;