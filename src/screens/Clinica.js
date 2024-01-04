import React, { Component, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import { ActivityIndicator, Divider } from 'react-native-paper'
import axios from 'axios'
import Config from '../../config/config.json'
import { Context } from '../../context/Provider';





export default function Configuracao({ navigation }) {

    const { email, setEmail } = useContext(Context)

    const { nomeAnimal, setNomeAnimal } = useContext(Context)
    const { idadeAnimal, setIdadeAnimal } = useContext(Context)
    const { comentario, setComentario } = useContext(Context)
    const { sexoAnimal, setSexoAnimal } = useContext(Context);
    const { coloracao, setColoracao } = useContext(Context)
    const { especie, setEspecie } = useContext(Context)
    const { imageAnimal, setImageAnimal } = useContext(Context)
    const { clinicas, setClinicas } = useContext(Context)

    const { codUser, setCodUser } = useContext(Context)
    const { codAnimal, setCodAnimal } = useContext(Context)


    useEffect(() => {
        viewClinicUser();
    }, [])


    const viewClinicUser = async () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />

        try {
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/viewClinicaUserController.php', {
                codAnimal: codAnimal,
            })

            console.log(response.data)
            if (response.data) {
                setClinicas(response.data)
            }

        } catch (error) {
            console.error('Error na requisição: ', error)
        }
        < ActivityIndicator animating={false} theme={{ colors: { primary: 'blue' } }} />
    }

    const openWhatsApp = () => {
        const phoneNumber = '5571999685168';
        const url = `https://wa.me/${phoneNumber}`;

        Linking.openURL(url).then((data) => {
            console.log('WhatsApp Opened');
        }).catch(() => {
            console.log('Não foi possível estabelecer conexão');
        });
    };


    return (
        <ImageBackground
            source={require('../../assets/img/bgTelaCadastro.png')}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>
                        <Text style={{ fontWeight: 'bold', marginTop: 50 }}>{clinicas.nome}</Text>
                        <Text>{clinicas.rua}, {clinicas.numero}</Text>
                        <Text>{clinicas.bairro}</Text>
                        <Text>{clinicas.telefone}</Text>
                        <Divider />
                    </View>
                    <TouchableOpacity
                        onPress={openWhatsApp}
                    >
                        <Text style={{ color: 'blue' }}>Click e marque uma Consulta</Text>
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