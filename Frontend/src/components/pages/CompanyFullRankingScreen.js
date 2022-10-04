import React from 'react';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyFullRanking from '../company-components/company-full-ranking/CompanyFullRanking';

const CompanyFullRankingScreen = () =>{
    return (
        <>
            <header>
                <CompanyHeader/> 
            </header>
            <main>
                <CompanyFullRanking/>
            </main>
        </>

    );
}

export default CompanyFullRankingScreen;