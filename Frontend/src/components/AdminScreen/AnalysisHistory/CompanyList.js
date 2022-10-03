import React, { useState } from 'react';
import './CompanyList.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';
import ReportsMap from './ReportsMap';

const CompanyList = ({list_of_companies}) =>{

  const [active, setActive] = useState(false);
  const [reports, setReports] = useState(['placeholder']);

  const listReports = async(empresaid) => {
    const response = await axios.get(
      "http://localhost:8000/relatorio/empresa",{ params: {
        'empresaid': empresaid}})
    .then(response => response);
    setReports(response.data.relatorios);
  };
  console.log(reports);
  if(reports[0] === 'placeholder'){
    listReports();
  }

  const detailsHandler = () => {
    setActive((prevState) => !prevState);
  }
  console.log(list_of_companies);
  return (
      <> 
          <ListGroup.Item
              as="li"
              className="list ms-3 d-flex justify-content-between align-items-start"
              >
          <div className='ms-2 me-auto'>
              <div className="fw-bold">
                  Empresa: {list_of_companies.tradeName}
                  <button onClick={(e) => {
                  e.preventDefault();
                  listReports(list_of_companies.id);
                  detailsHandler();
                  }} className='btn'>Relatórios</button>
              </div>
          </div>
          </ListGroup.Item>
        {active ? 
          <ReportsMap companyReports={reports}></ReportsMap>
        : ''}
      </>
  );
};
export default CompanyList;