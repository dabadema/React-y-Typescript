import express from 'express';

const server = express();

//Routing
server.get('/', (req, res) => {
    const datos = [
        { id: 1, nombre: 'Juan', apellido: 'Perez' },
        { id: 2, nombre: 'Maria', apellido: 'Gomez' },
        { id: 3, nombre: 'Pedro', apellido: 'Gomez' },
    ];

    res.json(datos);
});

export default server;
