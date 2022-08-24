import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
              <div className="icon">Lanterna <b style={{color: 'rgb(22, 182, 44)'}}>Verde</b> <img src="../imagens/gl.png" alt="" /></div>
      </Link>
          <div className="searchbox">
            <input type="search"  placeholder="Pesquise por uma empresa " />
            <span className="fa fa-search" />
          </div>
          <ol>
            <li>
              <Link
              to='/'
              onClick={closeMobileMenu}
              >
              <a href="#">Login</a>
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

export default Navbar;


