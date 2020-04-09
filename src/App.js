import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    let repository = {
      title: `Desafio ReactJS`,
      url: 'http://github.com/marcelopcolombo/',
      techs: []
    };
    api.post(`/repositories`, repository)
      .then(response => {
        if(response.status >= 200 && response.status <= 299){
          repository.id = response.data.id;
        }
        setRepositories([...repositories, repository]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(response => {
        if(response.status === 204){
          setRepositories(repositories.filter(repository => repository.id !== id))
        }
      });
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
