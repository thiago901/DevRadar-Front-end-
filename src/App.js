  //Componente: Um bloco isolado de HTML, CSS e JS que não interfira no resto da aplicação 
  
  //Propriedade: soa propriedades que o Componete PAI passa para o componente Filho 
  //Estado: Informação que o componete vai manipular ou informações mantidas no componete (Lembrar do Conceito de imutabilidade);

  //Video parada 1:33:09

import React ,{useEffect, useState}from 'react';
import api from './services/api'
import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {
  const [devs, setDevs] = useState([]);

 
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  },[]);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    setDevs([...devs,response.data]);
  }
  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
              <DevItem key={dev._id} dev={dev}  />
          ))}
          

        </ul>
      </main>
    </div>
  );
}

export default App;

