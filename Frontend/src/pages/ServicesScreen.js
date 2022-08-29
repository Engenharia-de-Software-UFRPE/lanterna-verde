import React from 'react';
import Header from '../components/header/Header'
import ServicesScreenBody from '../components/services/ServicesScreenBody';

const ServicesScreen = () =>{
    return (
        <>
            <header>
                <Header/> 
            </header>
            <main>
                <ServicesScreenBody />
            </main>
        </>

    );
}

export default ServicesScreen;
