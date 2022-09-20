import CompanyAnalysis from "./CompanyAnalysis";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyAnalysisMap = ({analisesEmpresa}) =>{
    return(
        <>
            {analisesEmpresa.map((analises_da_empresa) => (
                <CompanyAnalysis analises_da_empresa ={analises_da_empresa} />
            ))
            }
        </>
    )
}
export default CompanyAnalysisMap;