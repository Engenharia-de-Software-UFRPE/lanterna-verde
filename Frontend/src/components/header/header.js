import './header.css'

const Header = () =>{
    return(
        <header className="header">

        <div className="container">

          <a className="logo" href="#">
            <img className="logo-img" src="./imagens/logo-img.png" alt="Imagem da Logo"/>

            <h1 className="logo-name">
              Lanterna <span>Verde</span>
            </h1>
          </a>

          <a className="login" href="#loginScreen">Login</a>

        </div>
          
      </header>

    );
}

export default Header;