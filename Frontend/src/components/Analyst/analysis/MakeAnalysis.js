import React, { useState, useEffect } from 'react';
//import '../analystScreen/AnalystScreen.css';
// import './AnalysisDetails.css';
import { Link } from 'react-router-dom';
import './AnalysisMap'
import Analysis from './AnalysisDetails.js';
import NewsList from './NewsList';
// class AnalysisForm extends React.Component {
    const AnalysisForm = ({analise}) => {

        function testButtonHandler() {
          console.log({analise})
        }
        const [analysis] = useState(
          {
            'company' :'Empresa 171',
            'questao_set': [{'q': 'A empresa gosta de árvore?','anwser': false,'d': 1}, 
                         {'q': 'A empresa reutiliza papel?','anwser': true,'d': 1},
                         {'q': 'A empresa lava toalhas frequentemenete?','anwser': true,'d': 1},
                         {'q': 'A empresa tem bastante grama?','anwser': false,'d': 1}],
            'score' : 2.4,
            'finished': false,
            'comment': "COMENTÁRIO AQUI..."
          }

        )
        // console.log({analise})
        // analise = analysis

      
        return (
          <div>
                <div className='coluna'>
                <h1>Analise:</h1>
                <button onClick={testButtonHandler}>teste</button>
                <Analysis analise={analise}/>
                
                </div>
                


          </div>
        );
      }
      
      export default AnalysisForm;