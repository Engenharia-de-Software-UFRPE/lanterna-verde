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
        "http://localhost:8000/relatorio/empresa", 
        { 'empresaid': empresaid })
      .then(response => response);
      setReports(response.data.relatorios);
    };
    console.log(reports);

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
                    detailsHandler();
                    listReports(list_of_companies.id);
                    }} className='btn'>Relatórios</button>
                </div>
            </div>
            </ListGroup.Item>
         {active ? 
            <ListGroup.Item
                as="li"
                className="list ms-3 bg-success d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">
                 {/* Relatório: {reports} */}
                 <ReportsMap companyReports={reports}></ReportsMap>
                </div>
            </div>
            </ListGroup.Item>
         : ''}
        </>
    );
};
export default CompanyList;





//const CompanyList = () => {
    
//{/*Selecionar a empresa para ver suas análises*/}
    //return (<div id="requestListArea">
      //  <h6 class="requestList"><strong>Selecione a empresa que deseja ver o histórico de análises</strong></h6>
        //<div id="table-wrapper">
          //  <div id="table-scroll">
            //    <table>
              //      <tbody id="listaEmpresas"></tbody>
                //</table>
           // </div>
           // <button type="button" class="btnVoltarPlistaEmpresa">Voltar</button>
        //</div>
    //</div >)
//}
//export default CompanyList;