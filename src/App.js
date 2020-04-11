import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      
      setRepositories(response.data);

    });
  }, []);

  async function handleAddRepository() {
    
   const response = await api.post('repositories', {
      title: "Teste4",
      url: "http://teste4.com.br",
      techs: ["tec1","tec2","tec3"]
    });

    const repository = response.data; 
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try{

      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repositories => repositories.id !== id));

    }catch(err){
      alert('Erro ao deletar');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}> 

          {repository.title}
          

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

        </li>)}    
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
