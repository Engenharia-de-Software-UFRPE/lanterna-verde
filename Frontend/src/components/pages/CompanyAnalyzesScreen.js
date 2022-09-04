import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyAnalyzesFiltersSection from '../company-components/company-analyzes-filters-section/CompanyAnalyzesFiltersSection';
import CompanyAnalyzes from '../company-components/company-analyzes/CompanyAnalyzes';

const CompanyAnalyzesScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyAnalyzesFiltersSection/>
                <CompanyAnalyzes/>
            </main>
        </>

    );
}

export default CompanyAnalyzesScreen;
