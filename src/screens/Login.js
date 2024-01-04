import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ImageBackground,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { BsEnvelope } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Context } from '../../context/Provider';
import Config from '../../config/config.json'
import axios from 'axios'



export default function Login({ navigation }) {

    const [senhaVisivel, setSenhaVisivel] = useState(false)
    const { email, setEmail } = useContext(Context)
    const { senha, setSenha } = useContext(Context)
    const [message, setMessage] = useState('')


    function alternarVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel)
    }

    async function doLogin() {

        try {
            //realiza a requisição para o back end com axios
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/verifyLoginController.php', {
                email: email,
                senha: senha
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })


            //aqui ocorre a manipulação da resposta(response.data)
            if (response.data) {
                //redirecionamento para tela de home com os dados user
                navigation.navigate('AreaRestrita')
            } else {
                setMessage('Usuario ou senha inválidos!')
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            }

        } catch (error) {
            //aqui lidamos com os erros
            console.error('Erro na requisição:', error)

        }
    }



    return (
        <SafeAreaView style={styles.safe}>
            <ImageBackground
                style={styles.backImg}
                source={require('../../assets/img/bgTelaLoginSecondary.png')}
            >

                <KeyboardAvoidingView
                    style={styles.container}
                >
                    <Animated.View style={{ opacity: message ? 1 : 0, marginBottom: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 25, alignSelf: 'center' }}>{message}</Text>
                    </Animated.View>

                    <View style={styles.login__form}>
                        <TextInput
                            style={styles.login__input}
                            placeholder='user@exemplo.com'
                            placeholderTextColor={'#fff'}
                            value={email}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(texto) => setEmail(texto)}
                        />
                        <BsEnvelope size={26} color='#fff' style={styles.icon} />

                        <TextInput style={styles.login__input}
                            placeholder='senha'
                            secureTextEntry={!senhaVisivel}
                            placeholderTextColor={'#fff'}
                            value={senha}
                            onChangeText={(texto) => setSenha(texto)}
                        />
                        <GiPadlock size={26} color='#fff' style={styles.iconLockKey} />

                        <TouchableOpacity style={styles.iconEyeSlash} onPress={alternarVisibilidadeSenha}>
                            {senhaVisivel
                                ? <FaEye size={26} color='#fff' />
                                : <FaEyeSlash size={26} color='#fff' />}
                        </TouchableOpacity>

                    </View>
                    <View style={styles.login__footer}>

                        <TouchableOpacity style={styles.login__button}
                            onPress={doLogin}
                        >
                            <Text style={styles.login__buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.login__cadastre} onPress={() => navigation.navigate('Cadastro1')}>Cadastre-se!</Text>
                            <Text style={styles.login__cadastre}>Esqueceu a senha?</Text>
                            <Text style={styles.login__cadastre} onPress={() => navigation.navigate('AreaRestrita')}>AreaRestrita!</Text>
                            <Text style={styles.login__cadastre} onPress={() => navigation.navigate('UpdateUser')}>UpdateUser!</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    // TELA LOGIN    
    safe: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },

    backImg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },


    imageLogo: {
        width: 200,
        height: 200,
    },

    login__msg: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'red',
        marginTop: 10,
        marginBottom: 15
    },
    login__form: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },

    login__input: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#E4E7Eb',
        fontSize: 20,
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 2,
        marginHorizontal: 20,
        paddingLeft: 70,
        fontWeight: 'bold',
        color: '#fff'
    },

    login__footer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },

    login__button: {
        padding: 10,
        backgroundColor: '#FFC160',
        borderRadius: 30,
        width: '50%',
    },

    login__buttonText: {
        fontWeight: '500',
        fontSize: 22,
        color: '#333',
        textAlign: 'center',
    },

    login__cadastre: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
    },

    icon: {
        position: 'absolute',
        left: 30,
        top: 12,
    },

    iconLockKey: {
        position: 'absolute',
        left: 30,
        top: 77,
    },

    iconEyeSlash: {
        position: 'absolute',
        right: 30,
        top: 77,
    },



})