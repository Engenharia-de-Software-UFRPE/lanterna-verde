import React, { useState } from 'react';
import './company-services-screen-body.css';
import CompanyPaymentForm from '../company-payment-form/CompanyPaymentForm'

const CompanyServicesScreenBody = () => {
    const [popup, setPopup] = useState(false);
    const [packageSelected, setPackageSelected] = useState('');

    function openPopup (packageType){
        setPackageSelected(packageType)
        setPopup(true)
    }

    return(
        <section className='company-services-section'>
            <h2 className='title'>Escolha seu plano</h2>

            <CompanyPaymentForm open= {popup} onClose={()=>setPopup(false)} packageSelected={packageSelected}/>

            <div className='services'>
                <div className="service monthly">
                    <h3 className="service-title">Mensal</h3>
                    <p className='service-text'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates, sapiente voluptate, dicta sequi mollitia accusantium in vel 
                    vitae nam odit aut asperiores.Itaque rerum consectetur dolorum iure temporibus
                    minima maiores?</p>
                    <a href="#" className="sign-now" onClick={() => openPopup("Mensal")} >Assine Agora</a>
                </div>

                <div className="service biannual">
                    <h3 className="service-title">Semestral</h3>
                    <p className='service-text'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates, sapiente voluptate, dicta sequi mollitia accusantium in vel 
                    vitae nam odit aut asperiores.Itaque rerum consectetur dolorum iure temporibus
                    minima maiores?</p>
                    <a href="#" className="sign-now" onClick={() => openPopup("Semestral")}>Assine Agora</a>
                </div>

                <div className="service annual">
                    <h3 className="service-title">Anual</h3>
                    <p className='service-text'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates, sapiente voluptate, dicta sequi mollitia accusantium in vel 
                    vitae nam odit aut asperiores.Itaque rerum consectetur dolorum iure temporibus
                    minima maiores?</p>
                    <a href="#" className="sign-now" onClick={() => openPopup("Anual")}>Assine Agora</a>
                </div>
            </div>
        </section>
    );
}

export default CompanyServicesScreenBody;