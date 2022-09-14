// import React from 'react'
import Analysis from './Analysis';
import React, { useState, useEffect } from "react";
import axios from "axios";


const AnalysisMap =({analises, boolean} ) => {

    return(
        <>
            {analises.map((analise) => (
                <Analysis analise={analise} booleanAnalysis={boolean} />
            ))

            }
        </>
    );
} 


// const analysisMap =({analises}) => {
//     return(
//         <>
//             {analises.map((analise) => (
//                 <Analysis analise={analise} />
//             ))

//             }
//         </>
//     );
// } 

export default AnalysisMap;