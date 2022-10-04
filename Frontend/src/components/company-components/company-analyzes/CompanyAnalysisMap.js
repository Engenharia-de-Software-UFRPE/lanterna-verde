// import React from 'react'
import Analysis from "./AnalysisDetails";
import React, { useState, useEffect } from "react";




const CompanyAnalysisMap =({analises} ) => {

    return(
        <>
            {analises.map((analise) => (
                <Analysis analise={analise} />
            ))

            }
        </>
    );
} 


export default CompanyAnalysisMap;