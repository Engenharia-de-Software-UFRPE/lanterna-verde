import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyAnalysisInfo from '../company-components/company-analysis-info/CompanyAnalysisInfo'

const CompanyAnalysisInfoScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyAnalysisInfo/>
            </main>
        </>

    );
}

export default CompanyAnalysisInfoScreen;