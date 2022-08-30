import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyServicesScreenBody from '../company-components/company-services/CompanyServicesScreenBody';

const CompanyServicesScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyServicesScreenBody />
            </main>
        </>

    );
}

export default CompanyServicesScreen;
