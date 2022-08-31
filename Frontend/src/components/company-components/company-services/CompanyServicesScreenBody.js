import React, { useState } from 'react';
import './company-services-screen-body.css';
import CompanyPaymentForm from '../company-payment-form/CompanyPaymentForm'

const CompanyServicesScreenBody = () => {
    const [openPopup, setOpenPopup] = useState(false);
    return(
        <section className='company-services-section'>
            <h2 className='title'>Escolha seu plano</h2>

            <CompanyPaymentForm open= {openPopup} onClose={()=>setOpenPopup(false)}/>

            <div className='services'>
                <div className="service monthly">
                    <h3 className="service-title">Mensal</h3>
                    <p className='service-text'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates, sapiente voluptate, dicta sequi mollitia accusantium in vel 
                    vitae nam odit aut asperiores.Itaque rerum consectetur dolorum iure temporibus
                    minima maiores?</p>
                    <a href="#" className="sign-now" onClick={() => setOpenPopup(true)}>Assine Agora</a>
                </div>

                <div className="service annual">
                    <h3 className="service-title">Anual</h3>
                    <p className='service-text'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates, sapiente voluptate, dicta sequi mollitia accusantium in vel 
                    vitae nam odit aut asperiores.Itaque rerum consectetur dolorum iure temporibus
                    minima maiores?</p>
                    <a href="#" className="sign-now" onClick={() => setOpenPopup(true)}>Assine Agora</a>
                </div>
            </div>
        </section>
    );
}

export default CompanyServicesScreenBody;