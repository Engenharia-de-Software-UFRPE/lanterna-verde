import axios from 'axios';

//--------------------------------POSTS-------------------------------//
const postCompanyRegistration = async(companyData) =>{
    return await axios.post('http://127.0.0.1:8000/empresa/add', companyData)
    .then((response)=>{
        alert("Cadastro confirmado!")
        return response
    })
    .catch(() =>{
        alert("Erro")
        return 'ERROR'
    })
}

const postRequestAnalysis = async() =>{
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    await axios.post('http://localhost:8000/solicitacoesAnalise/add', '',{ withCredentials: true })
    .then(response => {
        alert("Análise solicitada com sucesso")
    })
    .catch(() =>{
        alert("Já existe uma solicitação de análise em andamento")
    })
}

export {
    postCompanyRegistration,
    postRequestAnalysis
}

