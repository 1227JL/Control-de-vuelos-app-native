import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Alerta = ({ alerta }) => {
  return (
    <View style={[styles.alertContainer, alerta.error ? styles.errorAlert : styles.successAlert]}>
      <Text style={[styles.alertText, alerta.error ? styles.alertTextError : styles.alertTextSucces]}>{alerta.msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    alertContainer: {
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: '#EEEEEE', // Fondo blanco
    },
    errorAlert: {
      borderColor: 'rgb(239, 68, 68)',
    },
    successAlert: {
      borderColor: '#4ce060',
    },
    alertText: {
      textAlign: 'center',
      color: '#4ce060',
      textTransform: 'uppercase'
    },
    alertTextSucces: {
      color: '#4ce060',
    },
    alertTextError: {
      color: '#rgb(239, 68, 68)',
    },
});
  
export default Alerta;
