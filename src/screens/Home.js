import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { ImageBackground, ScrollView, View } from 'react-native'
import Config from '../../config/config.json'
import axios from 'axios'
import { Context } from '../../context/Provider';

export default function Home({ navigation }) {

    const [allAnimals, setAllAnimals] = useState(null)

    useEffect(() => {
        viewAnimals();
    }, [])

    const viewAnimals = async () => {
        try {
            const response = await axios.post(Config.urlRootPhp + '../../../app/Controller/viewAnimalsController.php')
            setAllAnimals(response.data);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ImageBackground
            source={require('../../assets/img/bgTelaCadastro.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View>
                    {allAnimals && allAnimals.map((animal) => <Card key={animal.id} animal={animal} />)}
                </View>
            </ScrollView>
        </ImageBackground >
    )
}


