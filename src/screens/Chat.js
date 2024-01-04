import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'





export default function Chat({ route, navigation }) {

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../../assets/img/charlesdeluvio-DziZIYOGAHc-unsplash.jpg')}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    )
}
