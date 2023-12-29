import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ProgressBar, IconButton, Divider, ActivityIndicator } from 'react-native-paper'
import { Context } from '../../context/Provider'
import axios from 'axios';
import Config from '../../config/config.json'



export default function Cadastro4({ navigation }) {


    const { email, setEmail } = useContext(Context)
    const { nomeAnimal, setNomeAnimal } = useContext(Context)
    const { idadeAnimal, setIdadeAnimal } = useContext(Context)
    const { comentario, setComentario } = useContext(Context)
    const { sexoAnimal, setSexoAnimal } = useContext(Context);
    const { coloracao, setColoracao } = useContext(Context)
    const { especie, setEspecie } = useContext(Context)
    const { clinicas, setClinicas } = useContext(Context)
    const { imageAnimal, setImageAnimal } = useContext(Context)

    const { imageUser, setImageUser } = useContext(Context)
    const [clinicaSelect, setClinicaSelect] = useState('')


   
 

   

   
    


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
                            Galeria
                        </Text>
                    </View>
                    <ProgressBar
                        progress={1.0}
                        theme={{ colors: { primary: 'blue' } }}
                        visible={true}
                        style={{ marginBottom: 60 }}
                    />

                    <View style={styles.form}>
                      
                        


                       


                        <TouchableOpacity
                            style={styles.btnSkip}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Cadastrar</Text>
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