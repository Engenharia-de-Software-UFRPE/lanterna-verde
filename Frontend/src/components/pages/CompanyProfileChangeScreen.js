import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyProfileChange from '../company-components/company-profile-change/CompanyProfileChange';

const CompanyProfileChangeScreen = () => {
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyProfileChange/>
            </main>
        </>
    );
}

export default CompanyProfileChangeScreen;
