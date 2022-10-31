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

//--------------------------------PUTS--------------------------------//
const putRequestReanalysis = async(analysisId) =>{
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    await axios.put(`http://localhost:8000/empresa/analise/${analysisId}/solicitar-reanalise`,
                    true,
                    { withCredentials: true })
    .then(response =>{
        alert("Reanálise solicitada com sucesso")
    })
    .catch(error =>{
        alert("Erro")
    })
}

const putSignedPackage = async(packageSelected) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    await axios.put('http://localhost:8000/empresa/assign-package', 
                    JSON.stringify(packageSelected),
                    { withCredentials: true })
    .then(response =>{
        alert("Assinatura confirmada com sucesso")
    })
    .catch(error =>{
        alert("Erro")
    })
}

const putUpdateProfile = async(company) =>{
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    await axios.put('http://localhost:8000/empresa/update', company, { withCredentials: true })
    .then(response =>{
        alert("Dados alterados com sucesso")
    })
    .catch(error =>{
        alert("Erro")
    })
}

//--------------------------------GETS--------------------------------//
const getAnalysisInfo = async(analysisId) =>{
    return await axios.get(`http://localhost:8000/empresa/analise/${analysisId}`, 
                    { withCredentials: true })
    .then(response =>{
        return response
    })
    .catch(error =>{
        alert("ERRO")
    })
}

const getAllAnalyzes = async () => {
    return await axios.get('http://localhost:8000/empresa/analises', 
                    { withCredentials: true })
    .then(response => {
        return response
    })
    .catch(error =>{
        alert('Erro')
        return 'all analyzes'
    })
}

const getAllAnalyzesNotReanalyzed = async () => {
    return await axios.get('http://localhost:8000/empresa/analises/not-reanalyzed', 
                    { withCredentials: true })
    .then(response => {
        return response
    })
    .catch(error =>{
        alert('Erro')
    })
}

const getCompaniesRanking = async () => {
    return await axios.get('http://localhost:8000/empresa/ranking', { withCredentials: true })
    .then(response => {
        return response
    })
    .catch(error =>{
        alert("Erro")
        return 'companies ranking'
    })
}

const getCompanyLoggedIn = async () => {
    return await axios.get('http://localhost:8000/user/empresa', { withCredentials: true })
    .then(response => {
        return response
    })
    .catch(error =>{
        alert("Erro")
        return 'company logged in'
    })
}

const getLogout = async() =>{
    //axios.defaults.withCredentials = true; IF WORKS WITHOUT IT TAKE IT OFF
    return await axios.get("http://localhost:8000/logout", { withCredentials: true })
    .then(response => {
        return response
    })
    .catch(error =>{
        alert("Erro")
    })
}

const getReportInfo = async() => {
    return await axios.get('http://localhost:8000/empresa/report', { withCredentials: true })
    .then(response =>{
        return response
    })
    .catch(error =>{
        alert("Erro")
    })
}



export {
    postCompanyRegistration,
    postRequestAnalysis,

    putRequestReanalysis,
    putSignedPackage,
    putUpdateProfile,

    getAnalysisInfo,
    getAllAnalyzes,
    getAllAnalyzesNotReanalyzed,
    getCompaniesRanking,
    getCompanyLoggedIn,
    getLogout,
    getReportInfo

}

