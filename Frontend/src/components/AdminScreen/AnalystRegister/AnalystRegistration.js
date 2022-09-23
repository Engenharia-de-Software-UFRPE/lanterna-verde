import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './AnalystRegistration.css';

function AnalystRegistration() {
    const[analyst, setAnalyst] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        cpf: '',
        specialty: '',
        password: ''
    });
    const {username, first_name, last_name, email, cpf, specialty, password} = analyst;
    const handleInputChange = ({target}) => {
        setAnalyst({
            ...analyst,
            [target.name]: target.value
        })
    };
   
    const analystRegister = async(username, first_name, last_name, email, cpf, specialty, password) => {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            'http://localhost:8000/analista/add', 
         {'username': username, 'first_name': first_name, 'last_name': last_name, 'email': email, 'cpf': cpf, 'specialty': specialty, 'password': password})
        .then(function (response) {
            alert("Cadastro feito com sucesso!");
            console.log(response);
        })
        .catch(function (error) {
            if(error.response.data){
                alert("Analista já foi cadastrado.");
            }
        })
    };
 
    return (
        <>
        <div className="cont">
            <div className="container">
          
                <form>
                <h2>Cadastro Analista</h2>
                <div className="field name field">
                    <div className="input-field">
                        <input type="username" placeholder="Insira seu nome de usuario" className="user_name" name ='username' onChange={handleInputChange} value={username}/>
                    </div>
                </div>
                <div className="field first_name field">
                    <div className="input-field">
                        <input type="first_name" placeholder="Insira seu primeiro nome" className="first_name" name ='first_name' onChange={handleInputChange} value={first_name}/>
                    </div>
                </div>
                <div className="field last_name field">
                    <div className="input-field">
                        <input type="last_name" placeholder="Insira seu ultimo nome" className="last_name" name ='last_name' onChange={handleInputChange} value={last_name}/>
                    </div>
                </div>
                <div className="field email-field">
                    <div className="input-field">
                        <input type="email" placeholder="Insira seu e-mail" className="email" name = 'email' onChange={handleInputChange} value={email}/>
                    </div>
                </div>
                <div className="field cpf field">
                    <div className="input-field">
                        <input type="CPF" placeholder="Insira seu CPF" className="CPF" name ='cpf' onChange={handleInputChange} value={cpf}/>
                    </div>
                </div>
                <div className="field specialty">
                    <div className="input-field">
                        <input type="specialty" placeholder="Insira a especialidade" className="specialty" name ='specialty' onChange={handleInputChange} value={specialty}/>
                    </div>
                </div>
                <div className="field create-password">
                    <div className="input-field">
                        <input type="password" placeholder="Crie uma senha" className="password" name = 'password' onChange={handleInputChange} value={password}/>
                        <i className="bx bx-hide show-hide" />
                    </div>
                </div>

                <div className="input-field button">
                    <input type="submit" defaultValue="Submit Now" onClick={
                        (e) => {
                            e.preventDefault();
                            analystRegister(analyst.username, analyst.first_name, analyst.last_name, analyst.email, analyst.cpf, analyst.specialty, analyst.password);
                           
                    }}/>
                </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default AnalystRegistration;