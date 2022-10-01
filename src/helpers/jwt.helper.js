import jwt from 'jsonwebtoken';
import { Exception } from '../utils/exception.js';

const generateToken = (subject, payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { subject, expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
