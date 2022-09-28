import './InfoAnalysis.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import QuestionsFinished from '../../Analyst/analysis/QuestionsFinished';
import './CompanyList.css';

const InfoAnalysis = ({analise}) =>{
    return (<>
        <ListGroup.Item
        as="li"
        className="list ms-3 justify-content-between align-items-start"
        >
    <div className='ms-2 me-auto'>
        <div className="fw-bold">
            Empresa que foi avaliada: {}<br></br>
        </div>
    </div>
    </ListGroup.Item>
    {/* <div className='list'>
        Empresa que foi avaliada: {}<br></br>
        {/* Questões: {analise.questoes} <br></br> */}
        {/* Respostas: {analise.questao_set.map((questao) => (<QuestionsFinished questao={questao} />))}
        Score Atual: {analise.score}<br></br><br></br>
        Comentário feito: <br></br> */}
        {/* <textarea readonly='true' id='comentField' className='comentArea' >{analise.comment}</textarea> */}
    {/*</div> */}
    </>);
}
export default InfoAnalysis;