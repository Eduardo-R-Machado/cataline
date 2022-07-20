import express from 'express';
import { v4 as uuid } from 'uuid'
const app = express();

app.use(express.json());

/*
*  Tipos de parâmetros
* -------------------------------------------------
* Query Params: são parâmetros nomeados enviados na rota após "?" (filtros, paginação)
* Route Params: são parâmetros utilizados para identificar recursos
* Request Body: são parâmetros para criar ou alterar recursos
*/

interface User {
    name: string;
    email: string;
    password: string;
    id: string;
}

const users:User[] = []

app.get('/users', (request, response) => {
    return response.json(users);
})

app.post('/users', (request, response) => {
    const { name, email, password } = request.body;

    const user = {
        name,
        email,
        password,
        id: uuid()
    }

    users.push(user);

    return response.json(user);
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const  { name, email, password } = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return response.status(404).json({ error: 'Usuario nao encontrado' });
    }

    const user = { name, email, password, id };

    users[userIndex] = user;

    return response.json(user);

})

app.delete('/users/:id', (request, response) => {
    const {id} = request.params;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return response.status(404).json({ error: 'Usuario nao encontrado' });
    }

    users.splice(userIndex, 1);

    return response.status(204).send();
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
});