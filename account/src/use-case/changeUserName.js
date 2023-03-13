import { arrUsers } from './createUserAccount.js';

export default function changeUserNameUseCase(email, newName) {
  const userIndex = arrUsers.findIndex((elm) => elm.email === email);
  if (userIndex === -1) return false;

  arrUsers[userIndex].name = newName;
  return true;
}
