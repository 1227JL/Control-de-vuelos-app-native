import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/clienteAxios";
import { useState } from 'react'

export default function useAerolinea() {
  const [aerolineas, setAerolineas] = useState([]);

  const obtenerAerolineas = async () => {
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

      const { data } = await clienteAxios("/aerolineas", config);
      setAerolineas(data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    aerolineas,
    obtenerAerolineas
  };
}
