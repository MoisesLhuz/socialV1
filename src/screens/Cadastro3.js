import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator, IconButton, Divider } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { Animated } from 'react-native';
import { Context } from '../../context/Provider'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Config from '../../config/config.json'

export default function Cadastro3({ navigation }) {

    const { email, setEmail } = useContext(Context)
    const { clinicas, setClinicas } = useContext(Context)
    const [clinicaSelect, setClinicaSelect] = useState('')


    const { nomeAnimal, setNomeAnimal } = useContext(Context)
    const { idadeAnimal, setIdadeAnimal } = useContext(Context)
    const { comentario, setComentario } = useContext(Context)
    const { sexoAnimal, setSexoAnimal } = useContext(Context);
    const { coloracao, setColoracao } = useContext(Context)
    const { especie, setEspecie } = useContext(Context)
    const { imageAnimal, setImageAnimal } = useContext(Context)

    const [errorNomeAnimal, setErrorNomeAnimal] = useState('')
    const [errorIdadeAnimal, setErrorIdadeAnimal] = useState('')
    const [errorColoracao, setErrorColoracao] = useState('')
    const [errorEspecie, setErrorEspecie] = useState('')
    const [errorSexoAnimal, setErrorSexoAnimal] = useState('')


    useEffect(() => {
        viewClinica()
    })


    const pickFromGalaryAnimal = async () => {
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!data.canceled) {
            // const match = data.assets[0].uri.match(/^data:image\/(\w+);base64,/);
            // const extension = match ? match[1] : null;
            setImageAnimal(data.assets[0].uri)
            // let newFile = {
            //     base64: data.assets[0].uri,
            //     //type: extension,
            //     //name: data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.lenght)

            // };
            //handleUpload(newFile);

        }
    }

    const viewClinica = async () => {
        try {
            const response = await axios.get(Config.urlRootPhp + '../../../app/Controller/viewClinicaController.php')
            setClinicas(response.data);
        } catch (error) {
            console.log(error)
        }

    }


    const handleClinicaSelection = (clinica) => {
        setClinicaSelect(clinica)
    };



    //validação inputs
    const validacaoInput = () => {

        let error = false

        if (!nomeAnimal) {
            setErrorNomeAnimal('*Informe um nome!')
            error = true
        }
        if (!idadeAnimal) {
            setErrorIdadeAnimal('*Informe uma idade!')
            error = true
        }
        if (!coloracao) {
            setErrorColoracao('*Informe uma coloração!')
            error = true
        }
        if (!especie) {
            setErrorEspecie('*Informe a espécie do espécie!')
            error = true
        }
        if (!sexoAnimal) {
            setErrorSexoAnimal('*Informe o sexo do Animal!')
            error = true
        }
        return !error;
    }

    const handleSignUp = async () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />
        if (validacaoInput()) {
            try {
                const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/cadastroAnimalController.php', {
                    nome: nomeAnimal,
                    sexo: sexoAnimal,
                    idade: idadeAnimal,
                    comentarios: comentario,
                    coloracao: coloracao,
                    especie: especie,
                    Clinica_id: clinicaSelect.id,
                    email: email,
                    imageAnimal: imageAnimal
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.data) {
                    alert('Dados do usuário salvo com sucesso!')
                    navigation.navigate('Login')
                }
            } catch (error) {
                console.error('Erro na requisição: ', error)

            }
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
                            Cadastre seu PET
                        </Text>
                    </View>
                    <ProgressBar
                        progress={0.6}
                        theme={{ colors: { primary: 'blue' } }}
                        visible={true}
                        style={{ marginBottom: 60 }}
                    />
                    <View style={styles.form}>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            {imageAnimal
                                ?
                                <Image source={{ uri: imageAnimal }} style={{ width: 150, height: 150, borderRadius: '50%' }} />
                                :
                                <IconButton
                                    icon="camera"
                                    color='blue'
                                    size={50}
                                    onPress={pickFromGalaryAnimal}
                                    style={{ alignSelf: 'center' }}
                                />
                            }
                            <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginBottom: 10, color: '#444' }}>Insira uma imagem do seu PET!</Text>
                        </View>

                        <TextInput
                            label='Nome do Animal'
                            style={styles.input}
                            mode='outlined'
                            value={nomeAnimal}
                            onChangeText={value => {
                                setNomeAnimal(value)
                            }}
                        />
                        <Animated.View style={{ opacity: errorNomeAnimal ? 1 : 0, position: 'absolute', top: 210 }}>
                            <Text style={{ color: 'red', }}>{errorNomeAnimal}</Text>
                        </Animated.View>


                        <Picker
                            style={{ height: 50, marginBottom: 20, fontSize: 18 }}
                            selectedValue={sexoAnimal}
                            onValueChange={(itemValue, itemIndex) =>
                                setSexoAnimal(itemValue)
                            }>
                            <Picker.Item label="Selecione um Sexo " />
                            <Picker.Item label="Macho" value="Macho" />
                            <Picker.Item label="Fêmea" value="Femea" />
                        </Picker>
                        <Animated.View style={{ opacity: errorSexoAnimal ? 1 : 0, position: 'absolute', top: 280 }}>
                            <Text style={{ color: 'red', }}>{errorSexoAnimal}</Text>
                        </Animated.View>

                        <TextInput label='Idade'
                            style={styles.input}
                            mode='outlined'
                            value={idadeAnimal}
                            onChangeText={value => {
                                setIdadeAnimal(value)
                                setErrorIdadeAnimal(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorIdadeAnimal ? 1 : 0, position: 'absolute', top: 360 }}>
                            <Text style={{ color: 'red', }}>{errorIdadeAnimal}</Text>
                        </Animated.View>

                        <TextInput
                            label='Comentário curto sobre seu Pet.'
                            style={styles.input}
                            value={comentario}
                            mode='outlined'
                            onChangeText={value => {
                                setComentario(value)
                            }}
                        />

                        <TextInput
                            label='Coloração'
                            style={styles.input}
                            value={coloracao}
                            mode='outlined'
                            onChangeText={value => {
                                setColoracao(value)
                                setErrorColoracao(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorColoracao ? 1 : 0, position: 'absolute', top: 515 }}>
                            <Text style={{ color: 'red', }}>{errorColoracao}</Text>
                        </Animated.View>

                        <TextInput
                            label='Espécie'
                            style={styles.input}
                            mode='outlined'
                            keyboardType='numeric'
                            value={especie}
                            onChangeText={value => {
                                setEspecie(value)
                                setErrorEspecie(null)
                            }}
                        />
                        <Animated.View style={{ opacity: errorEspecie ? 1 : 0, position: 'absolute', top: 590 }}>
                            <Text style={{ color: 'red', }}>{errorEspecie}</Text>
                        </Animated.View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                            {clinicaSelect
                                ?
                                <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginBottom: 10, color: '#444' }}>Clínica Selecionada: {clinicaSelect.Nome}</Text>
                                :
                                <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginBottom: 10, color: '#444' }}>Clínica Selecionada:</Text>
                            }

                            <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginBottom: 30, color: '#444' }}>Agora escolha uma Clínica para vincular seu Pet!</Text>


                            <ScrollView style={{ width: '100%' }}>
                                {clinicas.map((clinica) => (
                                    <TouchableOpacity
                                        key={clinica.id}
                                        style={{ marginBottom: 30, justifyContent: 'center' }}
                                        onPress={() => handleClinicaSelection(clinica)}
                                    >
                                        <Text style={{ fontWeight: 'bold' }}>{clinica.Nome}</Text>
                                        <Text>{clinica.rua}, {clinica.numero}</Text>
                                        <Text>{clinica.bairro}</Text>
                                        <Text>{clinica.Telefone}</Text>
                                        <Divider />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <TouchableOpacity
                            style={styles.btnSkip}
                            onPress={handleSignUp}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView >
        </ImageBackground >
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