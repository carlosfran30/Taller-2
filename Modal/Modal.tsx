import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Props {
  isVisible: boolean;
  setShowModal: () => void;
  product: {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    pathimage: string;
    descripcion: string;
  } | null;
  addToCart: (product: any, quantity: number) => void;
}

export const ModalProduct = ({ isVisible, setShowModal, product, addToCart }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {product && (
            <>
              <Image source={{ uri: product.pathimage }} style={styles.modalImage} resizeMode="contain"/>
              <Text style={styles.modalTitle}>{product.nombre}</Text>
              <Text style={styles.modalPrice}>${product.precio} por 500ml</Text>
              <Text style={styles.modalStock}>Disponibles: {product.stock}</Text>
              <Text style={styles.modalDescription}>{product.descripcion}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity 
                  onPress={increaseQuantity} 
                  style={[styles.quantityButton, quantity >= product.stock && styles.disabledButton]}
                  disabled={quantity >= product.stock}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subtotal}>Subtotal: ${(product.precio * quantity).toFixed(2)}</Text>

              <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddToCart}
              >
                <Text style={styles.addButtonText}>Agregar ({quantity})</Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity style={styles.closeButton} onPress={setShowModal}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#8B4513',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    borderWidth: 2,
    borderColor: '#F5A623',
  },
  modalImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    color: '#F5DEB3',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalPrice: {
    color: '#F5A623',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalStock: {
    color: '#F5DEB3',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic'
  },
  modalDescription: {
    color: '#F5DEB3',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityButton: {
    backgroundColor: '#F5A623',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  quantityText: {
    color: '#2E1A0E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    color: '#F5DEB3',
    fontSize: 20,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  subtotal: {
    color: '#F5A623',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#F5A623',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#2E1A0E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#F5DEB3',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});