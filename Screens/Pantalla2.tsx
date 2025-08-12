import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Ingreso: undefined;
  Registro: undefined;
};

type Pantalla2NavigationProp = StackNavigationProp<RootStackParamList, 'Registro'>;

const MyButton = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Pantalla2 = () => {
  const navigation = useNavigation<Pantalla2NavigationProp>();
  const [usuario, setUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegistro = () => {
    if (!usuario || !contrasena) {
      console.log('Error: Todos los campos son obligatorios');
      return;
    }

    console.log('=== DATOS DE REGISTRO ===');
    console.log('Usuario registrado:', usuario);
    console.log('Contraseña:', contrasena);
    console.log('-------------------------');
    
    setUsuario('');
    setContrasena('');
  };

  const handleRegresar = () => {
    navigation.navigate('Ingreso');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTRO DE USUARIO</Text>
      <Text style={styles.label}>Nombre de usuario:</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Ingrese su usuario"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput 
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={!showPassword}
          value={contrasena}
          onChangeText={setContrasena}
          placeholder="Ingrese su contraseña"
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#5D4037" />
        </TouchableOpacity>
      </View>
      <MyButton onPress={handleRegistro} title="Registrar" />
      <MyButton onPress={handleRegresar} title="Regresar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E1A0E',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    color: '#F5A623',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  label: {
    color: '#F5DEB3',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#F5DEB3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F5A623',
    color: '#5D4037',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5A623',
  },
  buttonText: {
    color: '#F5DEB3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});