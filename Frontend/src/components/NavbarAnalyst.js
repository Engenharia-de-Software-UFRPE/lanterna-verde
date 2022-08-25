import React, { useState, useEffect } from 'react';
import './NavbarAnalyst.css';
import { Link } from 'react-router-dom';


function NavbarAnalista() {

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
    <div>
      <div className="main">
        <nav>
        <Link style={linkStyle}
              to='/'
              onClick={closeMobileMenu}
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
    </div>
  );
}

export default NavbarAnalista;
