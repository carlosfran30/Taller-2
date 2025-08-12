import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pantalla1 } from '../Screens/Pantalla1';
import { Pantalla2 } from '../Screens/Pantalla2';
import { Pantalla3 } from '../Screens/Pantalla3';

export type RootStackParamList = {
  Ingreso: undefined;
  Registro: undefined;
  Productos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Nativestack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ingreso" component={Pantalla1} options={{ headerShown: false }}/>
      <Stack.Screen name="Registro" component={Pantalla2} options={{ headerShown: false }}/>
      <Stack.Screen name="Productos" component={Pantalla3} options={{ headerShown: false }}/>
    </Stack.Navigator>    
  );
}