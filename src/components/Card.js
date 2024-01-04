import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icons } from '../components/Icons'
import { TextInput, ProgressBar, ActivityIndicator } from 'react-native-paper'
import { Animated } from 'react-native';
import { Context } from '../../context/Provider';


export default function Card({ animal }) {


    return (

        <View style={styles.container}>
            <View style={styles.caixa}>
                <Image
                    source={{ uri: animal.imagem }}
                    style={{ height: 200, width: 200, borderRadius: 8, resizeMode: 'cover' }}

                />
                <View>
                    <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 18 }}>{animal.nome_animal}</Text>
                    <Text style={{ marginLeft: 20, fontSize: 16 }}>{animal.especie}</Text>
                    <Text style={{ marginLeft: 20, fontSize: 16 }}>{animal.sexo}</Text>
                    <Text style={{ marginLeft: 20, fontSize: 16 }}>{animal.comentarios}</Text>
                </View>

                <View style={styles.buttons__iconsLike}>
                    <Icons.FaHeart size={20} color='red' />
                </View>

                <View style={styles.buttons__iconsOlhos}>
                    <Icons.FaEye size={20} color='#444' />
                </View>

                <View style={styles.buttons}>

                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    caixa: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttons__iconsLike: {
        borderRadius: 50,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons__iconsOlhos: {
        borderRadius: 50,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',


    },


})


