import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyMainScreenAnalyzesSection from '../company-components/company-main-screen-analyzes-section/CompanyMainScreenAnalyzesSection';
import CompanyMainScreenCenterSection from '../company-components/company-main-screen-center-section/CompanyMainScreenCenterSection';

const CompanyMainScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyMainScreenAnalyzesSection />
                <CompanyMainScreenCenterSection />
            </main>
        </>

    );
}

export default CompanyMainScreen;
