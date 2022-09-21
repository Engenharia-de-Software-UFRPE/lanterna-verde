import React from 'react';
/*import CompanyBasicHeader from '../company-components/company-basic-header/CompanyBasicHeader';*/
import CompanyRegistrationForm from '../company-components/company-registration-form/CompanyRegistrationForm';
import NavbarHome from '../HomeScreen/NavbarHome';
const CompanyRegistrationScreen = () => {
    return (
        <>
            <header>
                <NavbarHome />
            </header>
            <main>
                <CompanyRegistrationForm/>
            </main>
        </>
    );
}

export default CompanyRegistrationScreen;
