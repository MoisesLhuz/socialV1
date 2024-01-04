import React, { Component, useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator, IconButton, Divider } from 'react-native-paper'
import axios from 'axios'
import Config from '../../config/config.json'
import { Context } from '../../context/Provider';




export default function Configuracao({ navigation }) {


    //user
    const { email, setEmail } = useContext(Context)
    const { cep, setCep } = useContext(Context)
    const { rua, setRua } = useContext(Context)
    const { numero, setNumero } = useContext(Context)
    const { bairro, setBairro } = useContext(Context)
    const { cidade, setCidade } = useContext(Context)
    const { estado, setEstado } = useContext(Context)
    const { nome, setNome } = useContext(Context)
    const { sobrenome, setSobrenome } = useContext(Context)
    const { telefone, setTelefone } = useContext(Context)
    const { senha, setSenha } = useContext(Context)
    const { imageUser, setImageUser } = useContext(Context)

    const { imagemId, setImagemId } = useContext(Context)
    const { enderecoId, setEnderecoId } = useContext(Context)
    const { codUser, setCodUser } = useContext(Context)

    //animal
    const { nomeAnimal, setNomeAnimal } = useContext(Context)
    const { idadeAnimal, setIdadeAnimal } = useContext(Context)
    const { comentario, setComentario } = useContext(Context)
    const { sexoAnimal, setSexoAnimal } = useContext(Context);
    const { coloracao, setColoracao } = useContext(Context)
    const { especie, setEspecie } = useContext(Context)
    const { imageAnimal, setImageAnimal } = useContext(Context)
    const { clinicas, setClinicas } = useContext(Context)
    const { codAnimal, setCodAnimal } = useContext(Context)


    useEffect(() => {
        viewUser()
    }, [])


    async function viewUser() {

        try {

            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/viewUserController.php', {
                email: email,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (response.data) {
                //user
                setCep(response.data.cep)
                setRua(response.data.rua)
                setNumero(response.data.numero)
                setBairro(response.data.bairro)
                setCidade(response.data.cidade)
                setEstado(response.data.estado)
                setNome(response.data.nome_user)
                setSobrenome(response.data.sobrenome)
                setTelefone(response.data.telefone)
                setSenha(response.data.senha)
                setImageUser(response.data.imagem)
                setEnderecoId(response.data.endereco_id)
                setImagemId(response.data.image_id)
                setCodUser(response.data.cod_usuario)

                //animal
                setNomeAnimal(response.data.nome_animal)
                setIdadeAnimal(response.data.idade)
                setComentario(response.data.comentarios)
                setSexoAnimal(response.data.sexo)
                setColoracao(response.data.coloracao)
                setEspecie(response.data.especie)
                setClinicas(response.data.nome_clinica)
                setCodAnimal(response.data.animal_id)

            }
        } catch (error) {
            //aqui lidamos com os erros
            console.error('Erro na requisição:', error)

        }
    }

    return (


        <ImageBackground
            source={require('../../assets/img/bgTelaCadastro.png')}
            style={{ width: '100%', height: '100%' }}
        >
            <View style={styles.container}>

                <View style={styles.view}>

                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 20, alignItems: 'center' }}>
                        {imageUser && (
                            <Image
                                source={{ uri: imageUser }}
                                style={{ width: 150, height: 150, borderRadius: '50%' }}
                            />
                        )}
                        <Text style={{ fontSize: 25, marginTop: 20, fontWeight: '300' }}>Olá,</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{nome} {sobrenome}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('UpdateUser')}
                    >
                        <Text style={{ fontSize: 20, padding: 10 }}>Edita Cadastro Tutor</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UpdateAnimal')}
                    >
                        <Text style={{ fontSize: 20, padding: 10 }}>Edita Cadastro Pet</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Clinica')}
                    >
                        <Text style={{ fontSize: 20, padding: 10 }}>Informações da Clínica Vinculada</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ fontSize: 20, padding: 10 }}>Sair</Text>
                    </TouchableOpacity>
                    <Divider />
                </View>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    view: {
        width: '100%',
        padding: 20,
    },


})