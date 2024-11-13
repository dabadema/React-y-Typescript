import server from './server';
import colors from 'colors';
import 'reflect-metadata';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API is running on port ${port}`));
});
