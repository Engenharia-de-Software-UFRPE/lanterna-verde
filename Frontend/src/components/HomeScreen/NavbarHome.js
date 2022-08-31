import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css';
import './PopupLogin.css';
import Popup from 'reactjs-popup';

function NavbarHome() {
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

    return (
        <>
         <nav>
         <Link style={linkStyle}
                  to='/'
                  onClick={closeMobileMenu}
                  >
                  <div className="icon">Lanterna <b style={{color: 'rgb(22, 182, 44)'}}>Verde</b> <img src="../images/gl.png" alt="" /></div>
          </Link>
              <div className="searchbox">
                <input type="search"  placeholder="Pesquise por uma empresa " />
                <span className="fa fa-search" />
              </div>
              <ol>
                <li>
                  <Link
                    to='/login'
                    onClick={closeMobileMenu}
                  >
                  <Popup trigger={<a href="#">Login</a>}>
                    <div className='popup'>  
                      <Link
                        to='/'
                        onClick={closeMobileMenu}
                        >
                        <Popup trigger={<a href="" id='x-btn'><strong>X</strong></a>}/>
                      </Link>            
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
                  </Popup>
                  </Link>
                </li>
                <li> <Link
                  to='/cadastro'
                  onClick={closeMobileMenu}
                  >
                  <a href="#">Cadastro</a>
                  </Link>
                  
                </li>
              </ol>
            </nav>
        </>
    );
}

export default NavbarHome;