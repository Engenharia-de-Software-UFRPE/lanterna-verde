import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyMainScreenAnalyzesSection from '../company-components/company-main-screen-analyzes-section/CompanyMainScreenAnalyzesSection';
import CompanyMainScreenCenterSection from '../company-components/company-main-screen-center-section/CompanyMainScreenCenterSection';

const CompanyMainScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader newButton={<a className="btn see-all-analyzes" href="/CompanyMainScreen/Analyzes">Ver todas as análises</a>}/> 
            </header>
            <main>
                <CompanyMainScreenAnalyzesSection/>
                <CompanyMainScreenCenterSection/>
            </main>
        </>

    );
}

export default CompanyMainScreen;
