import React from 'react';
import BasicHeader from '../components/basic-header/BasicHeader'
import RegistrationForm from '../components/registration-form/RegistrationForm'

const RegistrationScreen = () => {
    return (
        <>
            <header>
                <BasicHeader/> 
            </header>
            <main>
                <RegistrationForm/>
            </main>
        </>
    );
}

export default RegistrationScreen;
