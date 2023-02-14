import usuarios from '../models/Usuario.js'

class UsuariosController{

    static listarUsuarios = (req, res)=>{
        usuarios.find((err, usuarios)=>{
            if(err) res.status(500).send({message: `${err.message} - Houve um erro ao listas os usuários`})
            res.status(200).json(usuarios)
        })
    }

    static inserirUsuario = (req, res)=>{
        const usuario = new usuarios(req.body)
        const uf = {AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to'}

        if(uf[usuario.endereco.estado.toUpperCase()]){
            usuario.save((err)=>{
                if(err){
                    res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
                }else{
                    res.status(201).send(usuario.toJSON())
                }
            })
        }else{
            res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
        }
    }

    static ListarUsuarioPorId = (req, res)=>{
        const id = req.params.id

        usuarios.findById(id, (err, elm)=>{
            if(err){
                res.status(404).send({message: `${err} - o id inserido não existe`})
            }else{
                res.status(200).send(elm)
            }
        })
    }

    static alterarUsuario = (req, res)=>{
        const id = req.params.id
        const usuario = new usuarios(req.body)

        const regexEmail = /^[A-z0-9'"!@#$%¨&*\(\)\-_=+´`~^;:/.,<>{|}\\]+@[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?(?:\.[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?)*$/
        const regexSenha = /^(?=.*[A-z])(?=.*\d)(?=.*['"!@#$%¨&*\(\)\-_=+´`~^;:/.,<>{|}\\])[A-z\d'"!@#$%¨&*\(\)\-_=+´`~^;:/.,<>{|}\\]{8,255}$/
        const regexCpf = /^\d{11}$/
        const regexTelefone = /^\d{10,13}$/
        const regexCep = /^\d{8}$/
        const uf = {AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to'}

        usuarios.findById(id, (err)=>{
            if(err){
                res.status(404).send({message: `${err} - o id inserido não existe`})
            }else{
                if(
                    usuario.nome
                    && usuario.endereco.rua
                    && usuario.endereco.numero
                    && usuario.endereco.cidade
                    && regexEmail.test(usuario.email)
                    && regexSenha.test(usuario.senha)
                    && regexCpf.test(usuario.cpf)
                    && regexTelefone.test(usuario.telefone)
                    && regexCep.test(usuario.endereco.cep)
                    && uf[usuario.endereco.estado.toUpperCase()]
                ){
                    usuarios.findByIdAndUpdate(id, {$set: req.body}, (err)=>{
                        res.status(204).send('Usuário atualizado com sucesso')
                    })
                }else{
                    res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
                }
            }
        })
    }

    static removerUsuario = (req, res)=>{
        const id = req.params.id

        usuarios.findByIdAndDelete(id, (err)=>{
            if(err){
                res.status(404).send('Usuário não encontrado')
            }else{
                res.status(204).send('Usuário removido com sucesso')
            }
        })
    }
}

export default UsuariosController