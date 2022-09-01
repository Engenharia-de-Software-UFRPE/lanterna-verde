import React from 'react'
import Analysis from './Analysis';

const analysisMap =({analises}) => {
    return(
        <>
            {analises.map((analise) => (
                <Analysis analise={analise} />
            ))

            }
        </>
    );
} 

export default analysisMap;