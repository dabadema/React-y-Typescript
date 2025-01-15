import jwt from 'jsonwebtoken';

export const generateJWT = () => {
    const data = {
        name: 'Juan',
        credit_card: '12312312315523',
        password: 'password',
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1m',
    });
    return token;
};
