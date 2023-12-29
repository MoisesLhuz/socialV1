import React, { useContext } from 'react'
import { useState } from 'react'
import { MaskedTextInput } from "react-native-mask-text";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator, IconButton } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { Animated } from 'react-native';
import { Context } from '../../context/Provider';
import Config from '../../config/config.json'
import axios from 'axios'


export default function Cadastro2({ navigation }) {

    //estados
    const { nome, setNome } = useContext(Context)
    const { sobrenome, setSobrenome } = useContext(Context)
    const { telefone, setTelefone } = useContext(Context)
    const { email, setEmail } = useContext(Context)
    const { senha, setSenha } = useContext(Context)
    const { cep, setCep } = useContext(Context)
    const { rua, setRua } = useContext(Context)
    const { numero, setNumero } = useContext(Context)
    const { bairro, setBairro } = useContext(Context)
    const { cidade, setCidade } = useContext(Context)
    const { estado, setEstado } = useContext(Context)
    const { imageUser, setImageUser } = useContext(Context)




    const [confSenha, setConfSenha] = useState('')
    //response erros
    const [errorNome, setErrorNome] = useState('')
    const [errorSobrenome, setErrorSobrenome] = useState('')
    const [errorTelefone, setErrorTelefone] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorSenha, setErrorSenha] = useState('')
    const [errorConfSenha, setErrorConfSenha] = useState('')


    const pickFromGalaryUser = async () => {
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!data.canceled) {
            // const match = data.assets[0].uri.match(/^data:image\/(\w+);base64,/);
            // const extension = match ? match[1] : null;
            setImageUser(data.assets[0].uri)
            // let newFile = {
            //     base64: data.assets[0].uri,
            //     //type: extension,
            //     //name: data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.lenght)

            // };
            //handleUpload(newFile);

        }
    }


    //validação inputs
    const validacaoInput = () => {

        let error = false

        if (!nome) {
            setErrorNome('*Informe um nome!')
            error = true
        }
        if (!sobrenome) {
            setErrorSobrenome('*Informe um sobrenome!')
            error = true
        }
        if (!senha) {
            setErrorSenha('*Informe uma senha!')
            error = true
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!email || !emailRegex.test(email)) {
            setErrorEmail('*Informe um email válido!')
            error = true
        }

        if (!confSenha || confSenha !== senha) {
            setErrorConfSenha('*Senha não confere com a digitada acima!')
            error = true
        }

        return !error;
    }

    //função tratar telefone
    const checkPhone = (e) => {

        let error = false


        const telefone = e.target.value.replace(/\D/g, '');
        const telefoneFormatoValido = /^\d{10,11}$/;

        if (!telefone || !telefoneFormatoValido.test(telefone)) {
            setErrorTelefone('*Informe um telefone válido!')
            error = true
        }
        setTelefone(telefone)
        return !error
    }



    //função para enviar dados para o banco
    const handleSignUp = async () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />
        if (validacaoInput()) {

            try {
                const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/cadastroUserController.php', {
                    cep: cep,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    nome: nome,
                    sobrenome: sobrenome,
                    telefone: telefone,
                    email: email,
                    senha: senha,
                    imageUser: imageUser
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                console.log(response.data)
            } catch (error) {
                console.error('Erro na requisição: ', error)

            }
            navigation.navigate('Cadastro3')
        }
        <ActivityIndicator animating={false} theme={{ colors: { primary: 'blue' } }} />
    }

    return (

        <ImageBackground
            source={require('../../assets/img/bgTelaCadastro.png')}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={styles.header}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 30, marginBottom: 30 }}>
                            Cadastro do Tutor
                        </Text>
                    </View>
                    <ProgressBar
                        progress={0.4}
                        theme={{ colors: { primary: 'blue' } }}
                        visible={true}
                        style={{ marginBottom: 60 }}
                    />
                    <View style={styles.form}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {imageUser
                                ?
                                <Image source={{ uri: imageUser }} style={{ width: 150, height: 150, borderRadius: '50%' }} />
                                :
                                <IconButton
                                    icon="camera"
                                    color='blue'
                                    size={50}
                                    onPress={pickFromGalaryUser}
                                    style={{ alignSelf: 'center' }}
                                />
                            }
                            <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginBottom: 30, color: '#444' }}>Insira uma imagem do Tutor!</Text>
                        </View>

                        <TextInput
                            label='Nome'
                            style={styles.input}
                            mode='outlined'
                            value={nome}
                            onChangeText={value => {
                                setNome(value)
                                setErrorNome(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorNome ? 1 : 0, position: 'absolute', top: 220 }}>
                            <Text style={{ color: 'red', }}>{errorNome}</Text>
                        </Animated.View>

                        <TextInput label='Sobrenome'
                            style={styles.input}
                            mode='outlined'
                            value={sobrenome}
                            onChangeText={value => {
                                setSobrenome(value)
                                setErrorSobrenome(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorSobrenome ? 1 : 0, position: 'absolute', top: 300 }}>
                            <Text style={{ color: 'red', }}>{errorSobrenome}</Text>
                        </Animated.View>

                        <TextInput
                            label='Telefone'
                            mode='outlined'
                            style={styles.input}
                            keyboardType='numeric'
                            mask='(99) 99999-9999'
                            onBlur={checkPhone}
                            onChangeText={value => {
                                setErrorTelefone(null)
                            }}
                            render={props =>
                                <MaskedTextInput
                                    {...props}
                                />
                            }
                        />
                        <Animated.View style={{ opacity: errorTelefone ? 1 : 0, position: 'absolute', top: 370 }}>
                            <Text style={{ color: 'red', }}>{errorTelefone}</Text>
                        </Animated.View>

                        <TextInput
                            label='E-mail'
                            style={styles.input}
                            value={email}
                            mode='outlined'
                            keyboardType='email-adress'
                            onChangeText={value => {

                                setEmail(value)
                                setErrorEmail(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorEmail ? 1 : 0, position: 'absolute', top: 455 }}>
                            <Text style={{ color: 'red', }}>{errorEmail}</Text>
                        </Animated.View>


                        <TextInput
                            label='Senha'
                            style={styles.input}
                            value={senha}
                            mode='outlined'
                            keyboardType='visible-password'
                            onChangeText={value => {
                                setSenha(value)
                                setErrorSenha(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorSenha ? 1 : 0, position: 'absolute', top: 535 }}>
                            <Text style={{ color: 'red', }}>{errorSenha}</Text>
                        </Animated.View>

                        <TextInput
                            label='Confirme a senha'
                            style={styles.input}
                            mode='outlined'
                            keyboardType='numeric'
                            value={confSenha}
                            onChangeText={value => {
                                setConfSenha(value)
                                setErrorConfSenha(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorConfSenha ? 1 : 0, position: 'absolute', top: 610 }}>
                            <Text style={{ color: 'red', }}>{errorConfSenha}</Text>
                        </Animated.View>

                        <TouchableOpacity
                            style={styles.btnSkip}
                            onPress={handleSignUp}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Avançar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView >
        </ImageBackground>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        width: '100%',
        padding: 20,
        top: -60
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