import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Cadastro1, Cadastro2, Cadastro3, Cadastro4, Home } from "./src/screens/index";
import Provider from './context/Provider'


const App = () => {

  const Stack = createNativeStackNavigator()

  return (

    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Cadastro1' component={Cadastro1} options={{ title: 'Cadastro Tutor', headerStyle: { backgroundColor: '#FFC160' } }} />
          <Stack.Screen name='Cadastro2' component={Cadastro2} options={{ title: 'Cadastro Tutor', headerStyle: { backgroundColor: '#FFC160' } }} />
          <Stack.Screen name='Cadastro3' component={Cadastro3} options={{ title: 'Cadastro do Pet', headerStyle: { backgroundColor: '#FFC160' } }} />
          <Stack.Screen name='Cadastro4' component={Cadastro4} options={{ title: 'Galeria', headerStyle: { backgroundColor: '#FFC160' } }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShow: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>



  );
}
export default App;