import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ModalProduct } from '../Modal/Modal';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  pathimage: string;
  descripcion: string;
}

const productosVikingos: Producto[] = [
  { id: '1', nombre: 'Poseidon', precio: 5, stock: 50, pathimage: 'https://abysmobeer.com/wp-content/uploads/2024/07/poseidon-lata-1024x958.png', descripcion: 'Una stout intensa con notas tostadas, chocolate negro y un toque ahumado. Su cuerpo robusto y final seductor te arrastrará al submundo de los sabores más profundos. Perfecta para los amantes de las cervezas oscuras y audaces.' },
  { id: '2', nombre: 'Hades', precio: 7, stock: 50, pathimage: 'https://abysmobeer.com/wp-content/uploads/2024/07/hades-lata-1024x1010.png', descripcion: 'IPA refrescante con un balance perfecto entre lúpulo cítrico y un toque salino que evoca la brisa marina. Con un amargor equilibrado y aroma a frutas tropicales, esta cerveza es una ola de frescura para tu paladar.' },
  { id: '3', nombre: 'Artemisa', precio: 8, stock: 30, pathimage: 'https://abysmobeer.com/wp-content/uploads/2024/07/artemisa-lata-1-1014x1024.png', descripcion: 'Una ale ligera y aromática, elaborada con miel silvestre y hierbas frescas. De cuerpo sedoso y sutilmente floral, es tan refrescante como un paseo por el bosque bajo la luz de la luna. Ideal para quienes buscan una experiencia fresca y delicada.' },
];

export const Pantalla3 = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [cart, setCart] = useState<{product: Producto, quantity: number}[]>([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product: Producto) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const addToCart = (product: Producto, quantity: number) => {
    if (quantity <= product.stock) {
      const existingItem = cart.find(item => item.product.id === product.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.product.id === product.id 
            ? {...item, quantity: item.quantity + quantity} 
            : item
        ));
      } else {
        setCart([...cart, {product, quantity}]);
      }
      setTotal(prev => prev + (product.precio * quantity));
      setShowModal(false);
    } else {
      alert(`No hay suficiente stock. Disponible: ${product.stock}`);
    }
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(item => item.product.id === productId);
    if (itemToRemove) {
      setTotal(prev => prev - (itemToRemove.product.precio * itemToRemove.quantity));
      setCart(cart.filter(item => item.product.id !== productId));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>BEBIDAS DEL ABYSMO</Text>
        <TouchableOpacity onPress={() => setShowCartModal(true)} style={styles.cartButton}>
          <Icon name="shopping-cart" size={30} color="#F5A623"/>
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

      <FlatList
        data={productosVikingos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.pathimage }} style={styles.imagen} resizeMode="contain"/>
            <View style={styles.textContainer}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>${item.precio} por 500ml</Text>
              <Text style={styles.stock}>Disponibles: {item.stock}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
            </View>
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Icon name="add-shopping-cart" size={30} color="#F5A623"/>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <ModalProduct 
        isVisible={showModal} 
        setShowModal={() => setShowModal(false)}
        product={selectedProduct}
        addToCart={addToCart}
      />

      <Modal visible={showCartModal} animationType="slide" transparent={false}>
        <View style={styles.cartModalContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>TU CUENTA</Text>
            <TouchableOpacity onPress={() => setShowCartModal(false)}>
              <Icon name="close" size={30} color="#F5A623"/>
            </TouchableOpacity>
          </View>

          {cart.length === 0 ? (
            <Text style={styles.emptyCart}>El carrito está vacío</Text>
          ) : (
            <>
              <FlatList
                data={cart}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image source={{ uri: item.product.pathimage }} style={styles.cartImage} resizeMode="contain"/>
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{item.product.nombre}</Text>
                      <Text style={styles.cartItemPrice}>${item.product.precio} x {item.quantity}</Text>
                      <Text style={styles.cartItemSubtotal}>${(item.product.precio * item.quantity).toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                      <Icon name="delete" size={24} color="#FF0000"/>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.product.id}
              />
              <View style={styles.cartTotal}>
                <Text style={styles.cartTotalText}>Total a pagar:</Text>
                <Text style={styles.cartTotalAmount}>${total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Pagar ahora</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2E1A0E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    color: '#F5A623',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
  total: {
    fontSize: 20,
    color: '#F5A623',
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  itemContainer: {
    backgroundColor: '#8B4513',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F5A623',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imagen: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  nombre: {
    color: '#F5DEB3',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  precio: {
    color: '#F5A623',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stock: {
    color: '#F5DEB3',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  descripcion: {
    color: '#F5DEB3',
    fontSize: 14,
    lineHeight: 18,
  },
  cartButton: {
    position: 'relative',
    padding: 10,
  },
  cartBadge: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartModalContainer: {
    flex: 1,
    backgroundColor: '#2E1A0E',
    padding: 20,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 24,
    color: '#F5A623',
    fontWeight: 'bold',
  },
  emptyCart: {
    color: '#F5DEB3',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#F5A623',
    borderWidth: 1,
  },
  cartImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    color: '#F5DEB3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    color: '#F5A623',
    fontSize: 14,
  },
  cartItemSubtotal: {
    color: '#F5DEB3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5A623',
  },
  cartTotalText: {
    color: '#F5DEB3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartTotalAmount: {
    color: '#F5A623',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#F5A623',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#2E1A0E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});