import { arrUsers } from "./createUserAccount.js";

export function removeUserUseCase(email){
  const index = arrUsers.findIndex(elm=> elm.email == email);
  if(index == -1) return false;

  arrUsers.splice(index, 1);
  return true
}