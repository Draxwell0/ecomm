export const arrUsers = [
    {
        id: 1,
        name: 'sample',
        email: 'sample@email.com',
        password: 'sample123',
        createdDate: new Date().toLocaleDateString('pt-BR')
    },
    {
        id: 2,
        name: 'git',
        email: 'git@git.com',
        password: 'git123',
        createdDate: new Date().toLocaleDateString('pt-BR'),
        address: {
            publicPlace: 'logradouro1',
            number: 123,
            aditionalInfos: 'complemento',
            district: 'bairro1',
            zipCode: 12345678,
            city: 'cidade',
            state: 'SP'
          }
    },
    {
        id: 3,
        name: 'alura',
        email: 'alura@alura.com',
        password: 'alura123',
        createdDate: new Date().toLocaleDateString('pt-BR'),
        address: {
            publicPlace: 'logradouro',
            number: 123,
            aditionalInfos: 'complemento',
            district: 'bairro',
            zipCode: 12345678,
            city: 'cidade',
            state: 'GO'
          }
    },
    {
        id: 4,
        name: 'javascript',
        email: 'javascript@js.com',
        password: 'javascript123',
        createdDate: new Date().toLocaleDateString('pt-BR'),
        address: {
            publicPlace: 'logradouro',
            number: 123,
            aditionalInfos: 'complemento',
            district: 'bairro',
            zipCode: 12345678,
            city: 'cidade',
            state: 'RJ'
          }
    },
    {
        id: 5,
        name: 'docker',
        email: 'docker@docker.com',
        password: 'docker123',
        createdDate: new Date().toLocaleDateString('pt-BR'),
        address: {
            publicPlace: 'logradouro2',
            number: 123,
            aditionalInfos: 'complemento',
            district: 'bairro2',
            zipCode: 12345687,
            city: 'cidade',
            state: 'SP'
          }
    },
]

export function createUserUseCase(name, email, password){
    arrUsers.push({
        id: arrUsers.length + 1,
        name: name,
        email: email, 
        password: password,
        createdDate: new Date().toLocaleDateString('pt-BR')
    })
    
    return arrUsers[arrUsers.length - 1];
}