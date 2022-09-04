import React from 'react';
import CompanyBasicHeader from '../company-components/company-basic-header/CompanyBasicHeader';
import Payment from '../company-components/company-payment-form/company-payment-form'

function CompanyPaymentScreen() {
  return (
    <>
    <header>
      <CompanyBasicHeader/> 
    </header>
    <body>
      <Payment/>
    </body>
    
    </>
    
  );
}

export default CompanyPaymentScreen;
