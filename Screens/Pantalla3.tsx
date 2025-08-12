import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Producto = {
  id: string;
  nombre: string;
  precio: string;
};

const productosVikingos: Producto[] = [
  { id: '1', nombre: 'Mead Odín', precio: '7 monedas de plata' },
  { id: '2', nombre: 'Cerveza Thor', precio: '5 monedas de plata' },
  { id: '3', nombre: 'Hidromiel Loki', precio: '6 monedas de plata' },
];

export const Pantalla3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BEBIDAS DEL VALHALLA</Text>
      <FlatList
        data={productosVikingos}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>{item.precio}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E1A0E',
  },
  titulo: {
    fontSize: 24,
    color: '#F5A623',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#8B4513',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#F5A623',
    borderWidth: 1
  },
  nombre: {
    color: '#F5DEB3',
    fontSize: 16
  },
  precio: {
    color: '#F5A623',
    fontWeight: 'bold'
  }
});