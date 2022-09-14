import React from 'react';
import CompanyBasicHeader from '../company-components/company-basic-header/CompanyBasicHeader';
import CompanyProfileChange from '../company-components/company-profile-change/CompanyProfileChange';

const CompanyProfileChangeScreen = () => {
    return (
        <>
            <header>
                <CompanyBasicHeader/> 
            </header>
            <main>
                <CompanyProfileChange/>
            </main>
        </>
    );
}

export default CompanyProfileChangeScreen;
