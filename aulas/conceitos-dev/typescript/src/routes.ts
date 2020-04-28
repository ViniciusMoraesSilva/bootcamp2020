import { Request, Response } from 'express';
import createUser from './services/CreateUser';

// string, number, boolean, object, Array
// interfaces

export function helloWorld (request: Request, response: Response) {
  const user = createUser({
    email: 'vinicius.moraes.silva@gmail.com',
    password: '123456789',
    techs: [
      'Node.js',
      'React',
      'React Native',
      { title: 'Javascript', experience: 100 },
  ],
  });
  return response.json({ message: 'Hello World'});
}