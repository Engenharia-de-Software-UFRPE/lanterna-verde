import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Popup.css';
import './ContainerHome.css';

function Popup() {
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
            <div id="main-news">
              <img src="../images/arrow.png" alt="" class="next-banner"/>
              <img src="../images/arrow2.png" alt="" class="next-banner2"/>
              <h1 id="title">Empresa xyz é destaque na produção de papel</h1>
            </div>

            <div id="feednews">
              <h1 class="col-feed">Feed de Notícias</h1>
            </div>
         
            <div id="news1">
              <a href="#">
                <h5 class="label1">Manchete 1</h5>
                <p class="resume1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Integer.
                </p>
              </a>
            </div>
            <div id="news2">
              <a href="#">
                  <h5 class="label2">Manchete 2</h5>
                  <p class="resume2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Integer.
                  </p>
              </a>
            </div>
            <div id="news3">
              <a href="#">
                <h5 class="label3">Manchete 3</h5>
                <p class="resume3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Integer.
                </p>
              </a>
            </div>
            <div id="news4">
              <a href="#">
                <h5 class="label4">Manchete 4</h5>
                <p class="resume4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Integer.
                </p>
              </a>
            </div>

            <div id="stamps-box">
            <img src="../images/selo_recilcagem.png" alt="" class="stamp"/>
            </div>

            <div>
              <h1 class="col-ranking">Ranking Empresas</h1>
            </div>
            <div id="ranking">
              <ol>
                <li>
                  <a href="#">
                    <span class="top-number">
                      <strong class="company-gp1">xyz Papéis</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="top-number">
                      <strong class="company-gp1">abc Makeup</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="top-number">
                      <strong class="company-gp1">klj Tecnologias</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="top-number">
                      <strong class="company-gp1">Ytr Plástico</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="top-number">
                      <strong class="company-gp1">Wqs Piscinas</strong>
                    </span>
                  </a>
                </li>
              </ol>
            </div>

            <div>
              <h1 class="col-access">Mais acessados</h1>
            </div>
            <div id="access">
              <ol>
              <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon">
                      <img src="../images/piscina.jpg" alt=""/>
                    </span>
                    <span class="top-access">
                      <strong class="company-gp2">Wqs Piscinas</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon">
                      <img src="../images/amazon.png" alt=""/>
                    </span>
                    <span class="top-access">
                      <strong class="company-gp2">Wqs Departamento</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                   </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                   <span class="comp-icon">
                      <img src="../images/spacex.png" alt=""/>
                    </span>
                    <span class="top-access">
                      <strong class="company-gp2">Wqs Espaço</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                   </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                   <span class="comp-icon">
                      <img src="../images/twitter.png" alt=""/>
                    </span>
                    <span class="top-access">
                      <strong class="company-gp2">Wqs Tweet</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon">
                      <img src="../images/walmart.png" alt=""/>
                    </span>
                    <span class="top-access">
                      <strong class="company-gp2">Wqs Supermercado</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
              </ol>
                    </div>

            <div id="access2">
              <ol>
              <li>
                  <a href="#"> {/*Link para o perfil da empresa*/}
                    <span class="comp-icon2">
                      <img src="../images/hotel.jpg" alt=""/>
                    </span>
                    <span class="top-access2">
                      <strong class="company-gp2-1">Wqs Hotel</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon2">
                      <img src="../images/greenpeace.jpg" alt=""/>
                    </span>
                    <span class="top-access2">
                      <strong class="company-gp2-1">Wqs Green</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon2">
                      <img src="../images/energia.jpg" alt=""/>
                    </span>
                    <span class="top-access2">
                      <strong class="company-gp2-1">Wqs Energia</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/} 
                    <span class="comp-icon2">
                      <img src="../images/compesa.png" alt=""/>
                    </span>
                    <span class="top-access2">
                      <strong class="company-gp2-1">Wqs Água</strong>
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#"> {/*Link para o perfil da empresa*/}
                    <span class="comp-icon2">
                      <img src="../images/starbucks.png" alt=""/>
                    </span>
                    <span class="top-access2">
                      <strong class="company-gp2-1">Wqs Café</strong> 
                      {/*<span>
                          "Estrelas"
                      </span>*/}
                    </span>
                  </a>
                </li>
              </ol>
            </div>
            
            <div className='popup'>    
                <Link to='/' oncClick={closeMobileMenu}>
                <a id='x' href="#"><strong>X</strong></a></Link>            
                <img src="../images/tick.png" alt="" />
                <h2>Faça seu login</h2>
                <p>Por favor digite seu login e senha.</p>
                <div>
                <input type="username" placeholder="Login" className="username" name ='username'/>
                </div>
                <div>
                <input type="password" placeholder="Senha" className="cPassword" />
                </div>
                <div id='buttons'>
                <ol>
                <div id='signin'>
                <li> <Link
                  to='/Admin'
                  onClick={closeMobileMenu}
                  >
                  <a href="#">Entrar</a>
                  </Link>
                </li>
                </div>
              </ol>
              </div>
              </div>
            </>
          );
        }

export default Popup;