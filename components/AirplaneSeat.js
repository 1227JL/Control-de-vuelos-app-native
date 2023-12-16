import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Pressable } from "native-base";

const AirplaneSeat = ({ numRef, handleModalAsiento, pasajeros }) => {
  const pasajeroConAsiento = pasajeros?.find((pasajero) => pasajero?.asiento === numRef);

  const seatStyle = {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    backgroundColor: pasajeroConAsiento ? '#BF0006' : '#bbb',
  };

  return (
    <Pressable onPress={() => handleModalAsiento(numRef)}>
      <View style={seatStyle}>
        <Text style={styles.seatNumber}>{numRef}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  seatNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AirplaneSeat;
