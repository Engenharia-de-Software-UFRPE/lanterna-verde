import React from 'react'
import Analise from './Analise';

const Analises =({analises}) => {
    return(
        <>
            {analises.map((analise) => (
                <Analise analise={analise} />
            ))

            }
        </>
    );
} 

export default Analises;