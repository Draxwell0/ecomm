import { arrUsers } from "./createUserAccount.js";

export function filterUsersByStateUseCase(state){
    
    const filteredArr = arrUsers.filter(elm => {
        return elm.address?.state == state
    });

    return filteredArr;
}