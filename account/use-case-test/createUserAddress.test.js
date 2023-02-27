/* eslint-disable no-console */
import { createUserAddressUseCase } from '../src/use-case/createUserAddress.js';

console.log(createUserAddressUseCase({
  publicPlace: 'logradouro',
  number: 123,
  aditionalInfos: 'complemento',
  district: 'bairro',
  zipCode: 12345678,
  city: 'cidade',
  state: 'uf',
}, 'sample@email.com'));
