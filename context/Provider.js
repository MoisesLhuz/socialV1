import React, { createContext, useEffect, useState } from "react";


//criação do contexto
export const Context = createContext();

export default function Provider({ children }) {

    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [imageUser, setImageUser] = useState('')
    const [imageAnimal, setImageAnimal] = useState('')

    const [nomeAnimal, setNomeAnimal] = useState('')
    const [idadeAnimal, setIdadeAnimal] = useState('')
    const [comentario, setComentario] = useState('')
    const [sexoAnimal, setSexoAnimal] = useState('')
    const [coloracao, setColoracao] = useState('')
    const [especie, setEspecie] = useState('')
    const [clinicas, setClinicas] = useState([])

    const [imagemId, setImagemId] = useState('')
    const [enderecoId, setEnderecoId] = useState('')
    const [codUser, setCodUser] = useState('')
    const [codAnimal, setCodAnimal] = useState('')


    const [user, setUser] = useState([])



    useEffect(() => {

    })

    return (
        <Context.Provider value={
            {
                rua, setRua, numero, setNumero, bairro, setBairro, cep, setCep, cidade, setCidade, estado, setEstado, nome, setNome, sobrenome, setSobrenome,
                telefone, setTelefone, email, setEmail, senha, setSenha, imageUser, setImageUser, imageAnimal, setImageAnimal, nomeAnimal, setNomeAnimal,
                idadeAnimal, setIdadeAnimal, comentario, setComentario, sexoAnimal, setSexoAnimal, coloracao, setColoracao, especie, setEspecie, clinicas, setClinicas,
                user, setUser, imagemId, setImagemId, enderecoId, setEnderecoId, codUser, setCodUser, codAnimal, setCodAnimal
            }
        }>
            {children}
        </Context.Provider >
    )

}