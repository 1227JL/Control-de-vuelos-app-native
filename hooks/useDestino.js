import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/clienteAxios";
import { useState } from 'react'

export default function useDestino() {
  const [destinos, setDestinos] = useState([]);

  const obtenerDestinos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/destinos", config);
      setDestinos(data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    destinos,
    obtenerDestinos
  };
}
