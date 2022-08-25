import React from 'react';
import './Analysis.css'

const Analysis = ({ analise }) => {
    return <div className='listAnalise'>Empresa: {analise.empresa}<br></br>Score: {analise.score}</div>
}; 

export default Analysis;