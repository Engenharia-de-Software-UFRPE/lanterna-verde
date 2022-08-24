import React from 'react';
import './Analise.css'

const Analise = ({ analise }) => {
    return <div className='listAnalise'>Empresa: {analise.empresa}<br></br>Score: {analise.score}</div>
}; 

export default Analise;