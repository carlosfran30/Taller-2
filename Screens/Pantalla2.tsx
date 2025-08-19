import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { User } from '../Navigator/NativeStack';

interface Props {
  users: User[];
  handleAddUser: (user: User) => void;
}

interface FormRegister {
  email: string;
  password: string;
}

type RootStackParamList = {
  Ingreso: undefined;
  Registro: undefined;
};

type Pantalla2NavigationProp = StackNavigationProp<RootStackParamList, 'Registro'>;

const MyButton = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export const Pantalla2 = ({ users, handleAddUser }: Props) => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<Pantalla2NavigationProp>();

  const handleSetValues = (name: keyof FormRegister, value: string) => {
    setFormRegister(prev => ({ ...prev, [name]: value }));
  };

  const verifyUser = () => {
    return users.find(user => user.email === formRegister.email);
  };

  const handleSignUp = () => {
    if (!formRegister.email || !formRegister.password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (verifyUser()) {
      Alert.alert('Error', 'Correo ya registrado');
      return;
    }

    const newId = Math.max(...users.map(user => user.id), 0) + 1;
    const newUser: User = {
      id: newId,
      email: formRegister.email,
      password: formRegister.password
    };

    handleAddUser(newUser);
    Alert.alert('Éxito', 'Registro exitoso');
    navigation.goBack();
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTRO DE USUARIO</Text>
      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={formRegister.email}
        onChangeText={(value) => handleSetValues('email', value)}
        placeholder="Ingrese su correo"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={!showPassword}
          value={formRegister.password}
          onChangeText={(value) => handleSetValues('password', value)}
          placeholder="Ingrese su contraseña"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#5D4037" />
        </TouchableOpacity>
      </View>
      <MyButton onPress={handleSignUp} title="Registrar" />
      <MyButton onPress={() => navigation.navigate('Ingreso')} title="Regresar" />
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