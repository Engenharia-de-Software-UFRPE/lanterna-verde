import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyReport from '../company-components/company-report/CompanyReport'

const CompanyReportScreen = () => {
    return (
        <>
            <header>
              <CompanyHeader/> 
            </header>
            <main>
              <CompanyReport/>
            </main>
        </>
    );
}

export default CompanyReportScreen;
