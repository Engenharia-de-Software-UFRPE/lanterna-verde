import React from 'react';
import './News.css'

const News = ({ noticia }) => {
    return <div className='listNoticia'>{noticia.titulo}<br></br>{noticia.preview}</div>
}; 

export default News;