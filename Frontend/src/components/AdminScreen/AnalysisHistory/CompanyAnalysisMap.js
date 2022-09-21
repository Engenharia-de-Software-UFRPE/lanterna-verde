import CompanyAnalysis from "./CompanyAnalysis";
import React from "react";

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