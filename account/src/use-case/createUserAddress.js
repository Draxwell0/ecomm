/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { arrUsers } from './createUserAccount.js';

export default function createUserAddressUseCase(address, email) {
  const userIndex = arrUsers.findIndex((elm) => elm.email === email);
  if (userIndex === -1) return 'Este usuário não existe';

  arrUsers[userIndex].address = {};

  for (const key in address) {
    arrUsers[userIndex].address[key] = address[key];
  }

  return arrUsers[userIndex];
}
