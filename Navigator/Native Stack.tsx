import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pantalla1 } from '../Screens/Pantalla1';
import { Pantalla2 } from '../Screens/Pantalla2';
import { Pantalla3 } from '../Screens/Pantalla3';

export interface User{
  id:number;
  email:string;
  password:string;
}

export type RootStackParamList = {
  Ingreso: undefined;
  Registro: undefined;
  Productos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Nativestack = () => {

    const users:User[]=[
      {id:1,email:'carlosfrancisco3098@hotmail.com',password:'12345'}
    ];
    const [listUsers, setlistUsers] = useState(users);

    const handleAddUser=(user:User)=>{
      setlistUsers([...listUsers,user]);
    }
  

  return (
    <Stack.Navigator>
      <Stack.Screen name="Ingreso" children={()=><Pantalla1 users={listUsers}/>} options={{ headerShown: false }}/>
      <Stack.Screen name="Registro" children={()=><Pantalla2 users={listUsers} handleAddUser={handleAddUser}/>}  options={{ headerShown: false }}/>
      <Stack.Screen name="Productos" component={Pantalla3} />
    </Stack.Navigator>    
  );
}