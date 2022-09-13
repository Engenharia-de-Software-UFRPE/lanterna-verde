import React from 'react';
import './ContainerHome.css';

function ContTest2() {

    return(
        <>
        <body>
        <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
            integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
            crossorigin="anonymous"
        />
            <main>
              {/*MAIN VIEW*/}  
                <div className="news3" id="home">
                    <div class="main__container">
                        <h1 class="main__heading">Crescimento Verde</h1>
                        <p class="main__description">Análises e metas concretas para o desempenho da sua empresa</p>
                        <button class="main__btn">
                            <a href="/CompanyRegistration">Cadastre-se</a>
                        </button>
                    </div>
                </div>        
            </main>

            

            {/*NEWS FEED*/}
            <div class="news" id="news">
                <h1>Feed de Notícias</h1>
                <div class="news__wrapper">
                    <div class="news__card">
                        <h2>Manchete 1</h2>
                        <p>With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#">
                            <div class="news__button"><button>Saiba mais</button></div>
                        </a>
                    </div>
                    <div class="news__card">
                        <h2>Manchete 2</h2>
                        <p>With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#">
                            <div class="news__button"><button>Saiba mais</button></div>
                        </a>
                    </div>
                    <div class="news__card">
                        <h2>Manchete 3</h2>
                        <p>With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#">
                            <div class="news__button"><button>Saiba mais</button></div>
                        </a>
                    </div>
                    <div class="news__card">
                        <h2>Manchete 4</h2>
                        <p>With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#">
                            <div class="news__button"><button>Saiba mais</button></div>
                        </a>
                    </div>
                </div>
            </div>

            {/*ABOUT SECTION*/}
            <div class="news4" id="about">
                <div class="about__container">
                    <div class="about__img--container">
                        <div class="about__img--card"><i class="fas fa-layer-group"></i></div>
                    </div>
                    <div class="about__content">
                        <h1>O que fazemos?</h1>
                        <h2>Nós ajudamos o desempenho ambiental de empresas</h2>
                        <p>Entre em contato conosco para mais informações</p>
                    </div>
                </div>
            </div>
            

            {/*RANKING SECTION*/}
            <div class="news" id="sign-up">
                <h1>Ranking Empresas</h1>
                <div class="about__container">
                    <div class="about__content">
                    <ol>
                        <li>
                        <a href="#">
                            <span class="top__number">
                            <strong class="company-gp1">xyz Papéis</strong>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="top__number">
                            <strong class="company-gp1">abc Makeup</strong>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="top__number">
                            <strong class="company-gp1">klj Tecnologias</strong>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="top__number">
                            <strong class="company-gp1">Ytr Plástico</strong>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="top__number">
                            <strong class="company-gp1">Wqs Piscinas</strong>
                            </span>
                        </a>
                        </li>
                    </ol>
                    
                    </div>
                    <div class="about2__content">
                        <ol>
                        <li>
                            <a href="#">
                                <span class="top__number">
                                <strong class="company-gp1">Qlp Hotel</strong>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="top__number">
                                <strong class="company-gp1">Xyz Tecidos</strong>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="top__number">
                                <strong class="company-gp1">Klj Construções</strong>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="top__number">
                                <strong class="company-gp1">Mnp Supermercado</strong>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="top__number">
                                <strong class="company-gp1">Opq Energia</strong>
                                </span>
                            </a>
                        </li>
                        </ol>
                    </div>
                </div>
            </div>

            {/*MOST ACCESSED*/}
            <div class="news2" id="sign-up">
                <h1>Mais Acessados</h1>
                <div class="about__container">
                    <div class="access__content">
                    <ol>
                        <li>
                        <a href="#">
                            <span class="comp__icon">
                            <img src="../images/piscina.jpg" alt=""/>
                            </span>
                            <span class="top__access">
                            <strong>Wqs Piscinas</strong>
                            </span>

                            {/*STAR RATING*/}
                            <div class="rating__container">
                                <div class="rating__wrap">
                                    <div class="center">
                                    <fieldset class="rating">
                                        <input type="radio" id="star5" name="rating" value="5"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star4" name="rating" value="4"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star3" name="rating" value="3"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star2" name="rating" value="2"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star1" name="rating" value="1"/><label for="star1" class="full">
                                        </label>
                                    </fieldset>
                                    </div>
                                </div>
                            </div>

                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="comp__icon">
                            <img src="../images/amazon.png" alt=""/>
                            </span>
                            <span class="top__access">
                            <strong>Wqs Departamento</strong>
                            </span>

                            {/*STAR RATING*/}
                            <div class="rating__container">
                                <div class="rating__wrap">
                                    <div class="center">
                                    <fieldset class="rating">
                                        <input type="radio" id="star5" name="rating" value="5"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star4" name="rating" value="4"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star3" name="rating" value="3"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star2" name="rating" value="2"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star1" name="rating" value="1"/><label for="star1" class="full">
                                        </label>
                                    </fieldset>
                                    </div>
                                </div>
                            </div>

                        </a>
                        </li>
                        <li>
                        <a href="#"> 
                            <span class="comp__icon">
                                <img src="../images/spacex.png" alt=""/>
                                </span>
                                <span class="top__access">
                                <strong>Wqs Espaço</strong>
                            </span>
                            
                            {/*STAR RATING*/}
                            <div class="rating__container">
                                <div class="rating__wrap">
                                    <div class="center">
                                    <fieldset class="rating">
                                        <input type="radio" id="star5" name="rating" value="5"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star4" name="rating" value="4"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star3" name="rating" value="3"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star2" name="rating" value="2"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star1" name="rating" value="1"/><label for="star1" class="full">
                                        </label>
                                    </fieldset>
                                    </div>
                                </div>
                            </div>

                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <span class="comp__icon">
                                <img src="../images/twitter.png" alt=""/>
                            </span>
                            <span class="top__access">
                                <strong>Wqs Tweet</strong>
                            </span>

                            {/*STAR RATING*/}
                            <div class="rating__container">
                                <div class="rating__wrap">
                                    <div class="center">
                                    <fieldset class="rating">
                                        <input type="radio" id="star5" name="rating" value="5"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star4" name="rating" value="4"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star3" name="rating" value="3"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star2" name="rating" value="2"/><label for="star1" class="full">
                                        </label>
                                        <input type="radio" id="star1" name="rating" value="1"/><label for="star1" class="full">
                                        </label>
                                    </fieldset>
                                    </div>
                                </div>
                            </div>

                        </a>
                        </li>
                    </ol>
                    </div>
                </div>
            </div>


            {/*FOOTER*/}
            <div class="footer__container">
                <div class="footer__links">
                    <div class="footer__link--wrapper">
                    <div class="footer__link--items">
                        <h2>Sobre Nós</h2>
                        <a href="/sign__up">Como funciona</a><a href="/">Terms of Service</a>
                    </div>
                    <div class="footer__link--items">
                        <h2>Contate-nos</h2>
                        <a href="/">Contato</a> <a href="/">Suporte</a>
                        <a href="/">Localização</a>
                    </div>
                    </div>
                    <div class="footer__link--wrapper">
                    <div class="footer__link--items">
                        <h2>Redes Sociais</h2>
                        <a href="/">Instagram</a> <a href="/">Facebook</a>
                    </div>
                    </div>
                </div>
                <section class="social__media">
                    <div class="social__media--wrap">
                    <div class="footer__logo">
                        <a href="/" id="footer__logo">LANTERNA VERDE</a>
                    </div>
                    <p class="website__rights">© LANTERNA VERDE 2022. All rights reserved</p>
                    <div class="social__icons">
                        <a href="/" class="social__icon--link" target="_blank"
                        ><i class="fab fa-facebook"></i
                        ></a>
                        <a href="/" class="social__icon--link"
                        ><i class="fab fa-instagram"></i
                        ></a>
                        <a href="/" class="social__icon--link"
                        ><i class="fab fa-linkedin"></i
                        ></a>
                    </div>
                    </div>
                </section>
            </div>
        </body>
        <script src="star-rating.js"></script>
        </>
    );
}

export default ContTest2;