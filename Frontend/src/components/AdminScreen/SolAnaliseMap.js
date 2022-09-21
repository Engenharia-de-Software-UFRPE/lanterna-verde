import SolAnalise from './SolAnalise';
import React, { useState, useEffect } from "react";
import axios from "axios";

const SolAnaliseMap =({soliciatoes_analise}) => {
    return(
        <>
            {soliciatoes_analise.map((solicita_a_analise) => (
                <SolAnalise solicita_a_analise ={solicita_a_analise} />
            ))
            }
        </>
    );
} 
export default SolAnaliseMap;