import { arrUsers } from "./createUserAccount.js";

export function searchUserAccountByEmailUseCase(email){
    const userIndex = arrUsers.findIndex(elm => elm.email == email);

    return userIndex != -1 ? arrUsers[userIndex] : 'Este usuário não existe';
}

