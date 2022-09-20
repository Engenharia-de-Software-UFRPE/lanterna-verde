import '/AnalysisDetail.css'
import SolAnalise from './SolAnalise'
import SolAnaliseMap from './SolAnaliseMap'

function SolicitaAnaliseDetail(){

    const [analistas, setAnalistas] = useState(false);

    const setNumAnalistas = async (number) => {
        const response = await axios
        .post(
          'http://localhost:8000/solicitacoesAnalise/add',
          { number: number}
        )
        .then((response) => response)
        .catch(function (error) {
          if(error.response){
            console.log(analistas.response.data);
            setAnalistas(true);
          }
        });
      };


    return(
        <>
        <div className='container'>
             
             <h2>Detalhes da Análise</h2>
             <div className="fw-bold">Nome da Empresa que solicitou a análise: {solicita_a_analise.empresa}</div>
             <div className="fw-bold">ID da Empresa: {solicita_a_analise.id}</div>
             <Popup trigger={<a href="#">Criar Análise</a>}>
                <form action="http://localhost:8000/solicitacoesAnalise/detail" method='post'>
                    <Popup trigger={<a href=""><strong>Fechar</strong></a>}/>
                    <Popup trigger={<input type="submit" defaultValue="Submit Now" />}/>
                
                    <div className="input-field">
                        <input type="number" placeholder="Informe a quantidade de analistas" className="number" name = 'number'/>
                        <i className="bx bx-hide show-hide" />
                    </div>
                </form>
             </Popup>
        </div>
        </>
    )
}