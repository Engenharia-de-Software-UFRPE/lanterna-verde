import React from 'react'

const Teste = ({analystInfo}) => {
  return (
    <body>
  <div class = "main">
  <div class="profile-card">
    <div class="card-header">
      <div class="pic">
        <img src="../images/robson.jpg" alt=""/>
      </div>
      <div class="name">
        {/* {analystInfo.Usuario.first_name} {analystInfo.Usuario.last_name} */}
        {/* Robson Pereira da Silva Alencar */}
       </div>
      <div class="desc">Analista Especialista</div>
      <div class="name">
        {analystInfo.Analista.cpf}
       </div>
      <div class="desc">CPF</div>
      <div class="name">
        {/* {analystInformation.Usuario.email} */}
       </div>
      <div class="desc">E-mail</div>
      <div class="name">
        {/* {analystInformation.Analista.specialty} */}
       </div>
      <div class="desc">Especialidade</div>
      <div class="name">
       </div>
      <div class="desc">Senha</div>
      

    </div>
   
  </div>
  </div>
 
</body>
  )
}

export default Teste