import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import backgroundImage from './assets/background.jpeg';

import Header from './components/Header';


/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    } )
  }, []);
  // useState retorna um array com 2 posições
  //
  // 1. Variável com o seu valor inicial
  // 2. Função para atualizarmos esse valor

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`);
    // setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post('projects', {
        title: `Novo Projeto ${Date.now()}`,
        owner: "Compra Jogo hsahsahhsasa"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
  <>
    <img width={300} src={backgroundImage} />
    <Header title="Project" />
    <ul>
    {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
  </>
  );
};

export default App;