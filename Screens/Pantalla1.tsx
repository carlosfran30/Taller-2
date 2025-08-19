import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { User } from '../Navigator/Native Stack';

interface Props {
  users: User[]
}

interface FormLogin {
  email: string;
  password: string;
}

type RootStackParamList = {
  Ingreso: undefined;
  Registro: undefined;
  Productos: undefined;
};

type Pantalla1NavigationProp = StackNavigationProp<RootStackParamList, 'Ingreso'>;

const MyButton = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Pantalla1 = ({ users }: Props) => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });
  const navigation = useNavigation<Pantalla1NavigationProp>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleIngreso = () => {
    navigation.navigate('Productos');
  };

  const handleRegistro = () => {
    navigation.navigate('Registro');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSetValues = (name: string, value: string) => {
    setFormLogin({...formLogin, [name]: value});
  };

  const handleSingIn = () => {
    if (!formLogin.email || !formLogin.password) {
      Alert.alert('Error', 'Por favor ingrese valores en todos los campos');
      return;
    }

    const userExists = users.some(user => 
      user.email === formLogin.email && 
      user.password === formLogin.password
    );

    if (!userExists) {
      Alert.alert('Error', 'Credenciales incorrectas');
      return;
    }

    navigation.navigate('Productos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ingresar</Text>
      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={formLogin.email}
        onChangeText={(value) => handleSetValues('email', value)}
        placeholder="Ingrese su correo"
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={!showPassword}
          value={formLogin.password}
          onChangeText={(value) => handleSetValues('password', value)}
          placeholder="Ingrese su contraseña"
          keyboardType='default'
          autoCapitalize='none'
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#5D4037" />
        </TouchableOpacity>
      </View>
      <MyButton onPress={handleSingIn} title="Ingresar" />
      <MyButton onPress={handleRegistro} title="Registrarse" />
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