import React from 'react';
import './Noticia.css'

const Noticia = ({ noticia }) => {
    return <div className='listNoticia'>{noticia.titulo}<br></br>{noticia.preview}</div>
}; 

export default Noticia;