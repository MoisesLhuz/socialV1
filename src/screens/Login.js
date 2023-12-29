import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ImageBackground,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { BsEnvelope } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [senhaVisivel, setSenhaVisivel] = useState(false)
    const [senha, setSenha] = useState('')

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Toast Message',
            text2: 'Isso é real',
            autoHide: true,
            visibilityTime: 1000
        })
    }



    function alternarVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel)
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
                    {/* <View>
                        <Text style={styles.login__msg}>
                            Usuário ou senha inválidos!
                        </Text>
                    </View> */}
                    <View style={styles.login__form}>
                        <TextInput
                            style={styles.login__input}
                            placeholder='user@exemplo.com'
                            placeholderTextColor={'#fff'}
                            underlineColorAndroid={'transparent'}
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
                        <TouchableOpacity style={styles.login__button}>
                            <Text style={styles.login__buttonText}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.login__cadastre} onPress={() => navigation.navigate('Cadastro1')}>Cadastre-se!</Text>
                            <Text style={styles.login__cadastre}>Esqueceu a senha?</Text>
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
        top: 15,
    },

    iconLockKey: {
        position: 'absolute',
        left: 30,
        top: 80,
    },

    iconEyeSlash: {
        position: 'absolute',
        right: 30,
        top: 80,
    },



})