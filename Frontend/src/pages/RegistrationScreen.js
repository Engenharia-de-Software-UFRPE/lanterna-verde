import React from 'react';
import BasicHeader from '../components/basic-header/BasicHeader'
import RegistrationForm from '../components/registration-form/RegistrationForm'

const RegistrationScreen = () => {
    return (
        <div className="body">
            <header className="Header">
                <BasicHeader/> 
            </header>
            <main className="Main">
                <RegistrationForm/>
            </main>
        </div>
    );
}

export default RegistrationScreen;
