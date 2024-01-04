import React, { Component, useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { TextInput, ProgressBar, ActivityIndicator, IconButton, Divider } from 'react-native-paper'
import { MaskedTextInput } from "react-native-mask-text";
import { Animated } from 'react-native';
import axios from 'axios'
import Config from '../../config/config.json'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker'
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


    useEffect(() => {
        viewImagePet();
    }, [])


    async function viewImagePet() {

        try {
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/viewImageControllerAnimal.php', {
                codAnimal: codAnimal,
            })



            if (response.data) {
                setImageAnimal(response.data.imagem_animal)
            }
        } catch (error) {
            console.error('Erro na requisição: ', error)

        }
    }


    //função update no banco de dados
    const handleUpload = async () => {
        <ActivityIndicator animating={true} theme={{ colors: { primary: 'blue' } }} />


        try {
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/updateAnimalController.php', {
                animal_id: codAnimal,
                nome_animal: nomeAnimal,
                sexo: sexoAnimal,
                idade: idadeAnimal,
                comentario: comentario,
                coloracao: coloracao,
                especie: especie,
                imagem_animal: imageAnimal
            })


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

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        {imageAnimal
                            ?
                            <Image source={{ uri: imageAnimal }} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                            :
                            < IconButton
                                icon="camera"
                                color='blue'
                                size={50}
                                onPress={pickFromGalaryAnimal}
                                style={{ alignSelf: 'center' }}
                            />
                        }
                        <TouchableOpacity
                            onPress={pickFromGalaryAnimal}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginBottom: 10, color: 'blue' }}>Click para editar imagem!</Text>
                        </TouchableOpacity>
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


                    <TextInput label='Idade'
                        style={styles.input}
                        mode='outlined'
                        value={idadeAnimal}
                        onChangeText={value => {
                            setIdadeAnimal(value)
                        }}
                    />


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

                        }}
                    />


                    <TextInput
                        label='Espécie'
                        style={styles.input}
                        mode='outlined'
                        keyboardType='numeric'
                        value={especie}
                        onChangeText={value => {
                            setEspecie(value)
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