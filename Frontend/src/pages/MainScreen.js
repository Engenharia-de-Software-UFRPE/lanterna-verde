import React from 'react';
import Header from '../components/header/Header'
import MainScreenAnalyzesSection from '../components/main-screen-analyzes-section/MainScreenAnalyzesSection'
import MainScreenCenterSection from '../components/main-screen-center-section.css/MainScreenCenterSection'

const MainScreen = () =>{
    return (
        <>
            <header>
                <Header/> 
            </header>
            <main>
                <MainScreenAnalyzesSection />
                <MainScreenCenterSection />
            </main>
        </>

    );
}

export default MainScreen;
