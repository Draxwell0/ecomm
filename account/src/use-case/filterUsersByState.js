import { arrUsers } from './createUserAccount.js';

export default function filterUsersByStateUseCase(state) {
  const filteredArr = arrUsers.filter((elm) => elm.address?.state === state);

  return filteredArr;
}
