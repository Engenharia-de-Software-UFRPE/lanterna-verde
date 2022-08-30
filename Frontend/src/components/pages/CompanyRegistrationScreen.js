import React from 'react';
import CompanyBasicHeader from '../company-components/company-basic-header/CompanyBasicHeader';
import CompanyRegistrationForm from '../company-components/company-registration-form/CompanyRegistrationForm';

const CompanyRegistrationScreen = () => {
    return (
        <>
            <header>
                <CompanyBasicHeader/> 
            </header>
            <main>
                <CompanyRegistrationForm/>
            </main>
        </>
    );
}

export default CompanyRegistrationScreen;
