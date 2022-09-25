import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyAnalyzesSection from '../company-components/company-analyzes/CompanyAnalyzesSection';

const CompanyAnalyzesScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyAnalyzesSection/>
            </main>
        </>

    );
}

export default CompanyAnalyzesScreen;
