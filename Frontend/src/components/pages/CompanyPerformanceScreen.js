import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyPerformance from '../company-components/company-performance/CompanyPerformance';

const CompanyPerformanceScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyPerformance />
            </main>
        </>

    );
}

export default CompanyPerformanceScreen;