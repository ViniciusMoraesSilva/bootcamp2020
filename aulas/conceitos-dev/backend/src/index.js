const express = require('express');

const { uuid, isUuid } = require('uuidv4');


const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end(PUT - Todos os dados / PATCH - Atualizar somente uma informação)
 * DELETE: Deletar uma informação no back-end
 */


/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/deletar)
 * Request Body: Conteúdo na hora criar ou editar um recurso
 */

/**
 * Middleware:
 * 
 * Interceptador de requisições que interrompe totalmente a requisição ou alterar dados da requisição ou alterar dados da requisição.
 */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('1');
  console.time(logLabel);
  
  next(); // Próximo middleware
  // return next(); // Próximo middleware mas não executa nada abaixo.
  
  console.log('2');
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ erro: 'Invalid project ID.' });
  }
}

app.use(logRequests);

app.get('/projects', (request, response) => {
  console.log('3');

  const { title } = request.query;

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {

  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);
  
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);
  
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1);
  
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 Back-end Started!');
});