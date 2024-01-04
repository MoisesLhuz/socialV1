import React, { useContext } from 'react'
import { useState } from 'react'
import { MaskedTextInput } from "react-native-mask-text";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator } from 'react-native-paper'
import { Animated } from 'react-native';
import { Context } from '../../context/Provider';



export default function Cadastro1({ navigation }) {

    //estados        
    const { cep, setCep } = useContext(Context)
    const { rua, setRua } = useContext(Context)
    const { numero, setNumero } = useContext(Context)
    const { bairro, setBairro } = useContext(Context)
    const { cidade, setCidade } = useContext(Context)
    const { estado, setEstado } = useContext(Context)

    //response erros
    const [errorRua, setErrorRua] = useState('')
    const [errorNumero, setErrorNumero] = useState('')
    const [errorBairro, setErrorBairro] = useState('')
    const [errorCep, setErrorCep] = useState('')
    const [errorCidade, setErrorCidade] = useState('')
    const [errorEstado, setErrorEstado] = useState('')


    //função busca cep
    const checkCEP = (e) => {
        //atribui o valor do input a const cep
        const cep = e.target.value.replace(/\D/g, '');

        //testa resposta da api
        try {
            //solicita o endereço do cep solicitado a api
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
                res => res.json()
            ).then(data => {
                setCep(cep)
                setRua(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
                setEstado(data.uf)
            })
        } catch (error) {
            console.error('Erro ao buscar dados do CEP', error)
        }
    }

    //validação inputs
    const validacaoInput = () => {

        let error = false

        if (!cep) {
            setErrorCep('*Informe um cep!')
            error = true
        }
        if (!numero) {
            setErrorNumero('*Informe o número de sua residência!')
            error = true
        }
        if (!rua) {
            setErrorRua('*Informe um logradouro!')
            error = true
        }
        if (!bairro) {
            setErrorBairro('*Informe um bairro!')
            error = true
        }
        if (!estado) {
            setErrorEstado('*Informe um estado!')
            error = true
        }
        if (!cidade) {
            setErrorCidade('*Informe uma cidade!')
            error = true
        }

        return !error;
    }

    //função para enviar dados para o banco
    const handleSignUp = () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />
        if (validacaoInput()) {
            navigation.navigate('Cadastro2')
        }
        < ActivityIndicator animating={false} theme={{ colors: { primary: 'blue' } }} />
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
                        progress={0.2}
                        theme={{ colors: { primary: 'blue' } }}
                        visible={true}
                        style={{ marginBottom: 80 }}
                    />
                    <View style={styles.form}>
                        <TextInput
                            label='Cep'
                            mode='outlined'
                            style={styles.input}
                            keyboardType='numeric'
                            mask='99.999-999'
                            value={cep}
                            onBlur={checkCEP}
                            onChangeText={value => {
                                setErrorCep(null)
                            }}
                            render={props =>
                                <MaskedTextInput
                                    {...props}
                                />
                            }
                        />
                        <Animated.View style={{ opacity: errorCep ? 1 : 0, position: 'absolute', top: 75 }}>
                            <Text style={{ color: 'red', }}>{errorCep}</Text>
                        </Animated.View>

                        <TextInput
                            label='Número'
                            style={styles.input}
                            mode='outlined'
                            keyboardType='numeric'
                            value={numero}
                            onChangeText={value => {
                                setNumero(value)
                                setErrorNumero(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorNumero ? 1 : 0, position: 'absolute', top: 150 }}>
                            <Text style={{ color: 'red', }}>{errorNumero}</Text>
                        </Animated.View>

                        <TextInput
                            label='Rua'
                            mode='outlined'
                            value={rua}
                            style={styles.input}
                            onChangeText={value => {
                                setErrorRua(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorRua ? 1 : 0, position: 'absolute', top: 230 }}>
                            <Text style={{ color: 'red', }}>{errorRua}</Text>
                        </Animated.View>


                        <TextInput
                            label='Bairro'
                            value={bairro}
                            style={styles.input}
                            mode='outlined'
                            onChangeText={value => {
                                setErrorBairro(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorBairro ? 1 : 0, position: 'absolute', top: 310 }}>
                            <Text style={{ color: 'red', }}>{errorBairro}</Text>
                        </Animated.View>


                        <TextInput
                            label='Cidade'
                            value={cidade}
                            style={styles.input}
                            mode='outlined'
                            onChangeText={value => {
                                setErrorCidade(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorCidade ? 1 : 0, position: 'absolute', top: 390 }}>
                            <Text style={{ color: 'red', }}>{errorCidade}</Text>
                        </Animated.View>

                        <TextInput
                            label='Estado'
                            value={estado}
                            style={styles.input}
                            mode='outlined'
                            onChangeText={value => {
                                setErrorEstado(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorEstado ? 1 : 0, position: 'absolute', top: 465 }}>
                            <Text style={{ color: 'red', }}>{errorEstado}</Text>
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