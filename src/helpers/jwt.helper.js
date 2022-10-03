import jwt from 'jsonwebtoken';
import { Exception } from '../utils/exception.js';

const generateToken = (payload, { expiresIn, subject, secret }) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload ?? {}, secret, { subject, expiresIn }, (err, token) => {
      if (err) {
        reject(new Exception({ message: 'Ocorreu um erro não esperado ao gerar o token', status: 500 }));
      }
      resolve(token);
    });
  });

const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(
          new Exception({
            message: 'Token inválido',
            status: 401,
          })
        );
      }
      resolve(decoded);
    });
  });

export default {
  generateToken,
  verifyToken,
};
