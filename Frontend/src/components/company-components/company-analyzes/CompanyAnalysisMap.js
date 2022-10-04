// import React from 'react'
import Analysis from "./AnalysisDetails";
import React, { useState, useEffect } from "react";




const CompanyAnalysisMap =({analises} ) => {

    return(
        <>
            {analises.map((analise, index) => (
                <Analysis analise={analise} id={index}/>
            ))

            }
        </>
    );
} 


export default CompanyAnalysisMap;