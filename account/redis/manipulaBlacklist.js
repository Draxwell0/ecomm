import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

export default {
  adiciona: async (token) => {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await setAsync(tokenHash, '');
    blacklist.expireat(tokenHash, dataExpiracao);
  },

  contemTokem: async (token) => {
    const tokenHash = geraTokenHash(token);
    const resultado = await existsAsync(tokenHash);
    return resultado === 1;
  },
};
