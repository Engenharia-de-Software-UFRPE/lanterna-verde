import React from 'react';
import './Analysis.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import AnalysisScreen from '../pages/AnalysisScreen';
import {useNavigate} from 'react-router-dom';

const Analysis = ({ analise ,booleanAnalysis}) => {

    const navigate = useNavigate();

    function makeAnalysisButton(){
        navigate('/analysisScreen',{
             state: {analise} }
        );
        
    }

    function seeAnalysisButton(){
        navigate('/analysisScreen',{
             state: {analise} }
        );
        
    }

    if (analise.finished == booleanAnalysis){// caso o atributo "finalizado" da análise tenha o mesmo valor que o booleano passado
        if (analise.finished == false){ //caso seu valor seja igual a false, um botão para seguir para a pagina de fazer a análise será mostrado
                return  <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">ID da Empresa: {analise.company}</div>
                Score: {analise.score} <br></br>
                
                Finalizada: {analise.finished.toString()}
                <button className ='makeAnalysisButton'onClick={makeAnalysisButton}>Fazer análise</button>
                </div>
            </ListGroup.Item>
        }
        else { //caso contrário um botão para visualizar a análise finalizada será mostrado
                return  <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">ID da Empresa: {analise.company}</div>
                Score: {analise.score} <br></br>
        
                Finalizada: {analise.finished.toString()}
                <button className ='seeAnalysisButton'onClick={seeAnalysisButton}>Ver  análise</button>
                </div>
            </ListGroup.Item>
        }

    }
    else { //caso o valor não bata com o passado, nada é mostrado
        return<></>
    }
    

}; 

// const Analysis = ({ analise }) => {
//     return <div className='ms-2 me-auto'>
//                 <div className="fw-bold">{analise.empresa}</div>
//                 {analise.score}
//            </div>
// }; 

{/* <div className='listAnalise'>
    Empresa: {analise.empresa}<br></br>Score: {analise.score}
</div> */}

export default Analysis;