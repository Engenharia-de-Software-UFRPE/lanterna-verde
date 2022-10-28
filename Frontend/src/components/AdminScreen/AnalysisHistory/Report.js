import React from "react";
import './CompanyList.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import Popup from 'reactjs-popup';
import axios from "axios";

const Report = ({report}) =>{
    console.log(report);

    const handleComentChange= () => {
        report.adm_comment= document.getElementById("admCommentField").value;
        console.log("Valor da chave 'comentário' da analise: " + report.adm_comment);
    }

    async function handleSaveClick(reportid, comment) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        let response = await axios.post("http://localhost:8000/relatorio/comment", 
        { 'reportid': reportid, 'comment': comment, withCredentials: true })
        .then(function (response) {
            alert(response.data);
        })
        .catch(function (error) {
            alert(error.response.data);
        })
    }
  
    return (
        <> 
            <ListGroup.Item
                as="li"
                className="list ms-3 bg-success d-flex justify-content-between align-items-start"
                >
                <div className='ms-2 me-auto'>
                    <div className="report fw-bold">
                        ID do Relatório: {report.id}
                    </div>
                </div>
                <Popup trigger={<button class='btn'>Visualizar</button>}>
                    <div className='popupReport'>           
                        <hr></hr>
                        <h4>Dados</h4>
                        <hr></hr>
                        <h5>ID da empresa: {report.company}</h5>
                        <h5>ID da solicitação de análise: {report.request}</h5>
                        <h5>Comentário do administrador: <br></br></h5>
                        <textarea id='admCommentField' className='admComment' onChange={handleComentChange}>{report.adm_comment}</textarea>
                        <button className='saveBtnComment' onClick={(e) => {
                            handleSaveClick(report.id, report.adm_comment)}}>Salvar comentário</button>
                        <hr></hr>
                        <h4>Pontuação</h4>
                        <hr></hr>
                        <ul>
                            <li>Dimensão 1: {report.scoreD1}</li>
                            <li>Dimensão 2: {report.scoreD2}</li>
                            <li>Dimensão 3: {report.scoreD3}</li>
                            <li>Dimensão 4: {report.scoreD4}</li>
                            <li>Ascore: {report.ascore}</li>
                        </ul>
                    </div>
                </Popup>
            </ListGroup.Item>

            
        </>
    );

}

export default Report;