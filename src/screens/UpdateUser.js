import React, { Component, useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator, IconButton, Divider } from 'react-native-paper'
import { MaskedTextInput } from "react-native-mask-text";
import { Animated } from 'react-native';
import axios from 'axios'
import Config from '../../config/config.json'
import { Context } from '../../context/Provider';





export default function Configuracao({ navigation }) {

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




    const [confSenha, setConfSenha] = useState('')



    //função tratar telefone
    const checkPhone = (e) => {

        let error = false


        const telefone = e.target.value.replace(/\D/g, '');
        const telefoneFormatoValido = /^\d{10,11}$/;

        if (!telefone || !telefoneFormatoValido.test(telefone)) {
            error = true
        }
        setTelefone(telefone)
        return !error
    }


    //função update no banco de dados
    const handleUpload = async () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />
        // console.log(codUser)
        // console.log(nome)
        // console.log(sobrenome)
        // console.log(telefone)
        // console.log(senha)
        // console.log(cep)
        // console.log(rua)
        // console.log(numero)
        // console.log(bairro)
        // console.log(cidade)
        // console.log(estado)
        // console.log(imageUser)
        // console.log(enderecoId)
        // console.log(imagemId)

        try {
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/updateUserController.php', {
                endereco_id: enderecoId,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cod_usuario: codUser,
                nome_user: nome,
                sobrenome: sobrenome,
                telefone: telefone,
                senha: senha
            })

            //console.log(response.data)

            if (response.data) {
                alert('Dados Atualizados com sucesso!')
                navigation.navigate('AreaRestrita')
            }

        } catch (error) {
            console.error('Error na requisição: ', error)
        }

        < ActivityIndicator animating={false} theme={{ colors: { primary: 'blue' } }} />

    }


    return (
        <ImageBackground
            source={require('../../assets/img/bgTelaCadastro.png')}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        label='Cep'
                        mode='outlined'
                        style={styles.input}
                        keyboardType='numeric'
                        mask='99.999-999'
                        value={cep}
                        onChangeText={value => {
                            setCep(value)
                        }}
                        render={props =>
                            <MaskedTextInput
                                {...props}
                            />
                        }
                    />

                    <TextInput
                        label='Número'
                        style={styles.input}
                        mode='outlined'
                        keyboardType='numeric'
                        value={numero}
                        onChangeText={value => {
                            setNumero(value)

                        }}
                    />

                    <TextInput
                        label='Rua'
                        mode='outlined'
                        value={rua}
                        style={styles.input}
                        onChangeText={value => {
                            setRua(value)
                        }}
                    />


                    <TextInput
                        label='Bairro'
                        value={bairro}
                        style={styles.input}
                        mode='outlined'
                        onChangeText={value => {
                            setBairro(value)
                        }}
                    />


                    <TextInput
                        label='Cidade'
                        value={cidade}
                        style={styles.input}
                        mode='outlined'
                        onChangeText={value => {
                            setCidade(value)
                        }}
                    />

                    <TextInput
                        label='Estado'
                        value={estado}
                        style={styles.input}
                        mode='outlined'
                        onChangeText={value => {
                            setEstado(value)
                        }}
                    />

                    <TextInput
                        label='Nome'
                        style={styles.input}
                        mode='outlined'
                        value={nome}
                        onChangeText={value => {
                            setNome(value)

                        }}
                    />

                    <TextInput label='Sobrenome'
                        style={styles.input}
                        mode='outlined'
                        value={sobrenome}
                        onChangeText={value => {
                            setSobrenome(value)

                        }}
                    />

                    <TextInput
                        label='Telefone'
                        mode='outlined'
                        style={styles.input}
                        keyboardType='numeric'
                        mask='(99) 99999-9999'
                        onBlur={checkPhone}
                        value={telefone}

                        render={props =>
                            <MaskedTextInput
                                {...props}
                            />
                        }
                    />


                    <TextInput
                        label='Senha'
                        style={styles.input}
                        value={senha}
                        mode='outlined'
                        keyboardType='visible-password'
                        onChangeText={value => {
                            setSenha(value)

                        }}
                    />

                    <TextInput
                        label='Confirme a senha'
                        style={styles.input}
                        mode='outlined'
                        keyboardType='numeric'
                        value={confSenha}
                        onChangeText={value => {
                            setConfSenha(value)

                        }}
                    />

                    <TouchableOpacity
                        style={styles.btnSkip}
                        onPress={handleUpload}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Salvar</Text>
                    </TouchableOpacity>
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

    form: {
        width: '100%',
        padding: 20,
        top: 20
    },

    input: {
        height: 50,
        marginBottom: 20,
        backgroundColor: '#fff'
    },

    btnSkip: {
        width: '100%',
        backgroundColor: '#FFC160',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

})