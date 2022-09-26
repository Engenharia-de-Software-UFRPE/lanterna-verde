import SolAnalise from './SolAnalise';
import React from "react";

const SolAnaliseMap =({soliciatoes_analise}) => {
    return(
        <>
            {soliciatoes_analise.map((solicita_a_analise) => (
                <SolAnalise solicita_a_analise ={solicita_a_analise}/>
            ))
            }
        </>
    );
} 
export default SolAnaliseMap;