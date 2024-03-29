import { createContext } from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import generarID from "../helpers/generarID";

const VueloContext = createContext();

const VueloProvider = ({ children }) => {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [vuelos, setVuelos] = useState([]);
  const [vuelo, setVuelo] = useState({});
  const [alerta, setAlerta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalAsiento, setModalAsiento] = useState(false);
  const [pasajero, setPasajero] = useState({});
  const [modalVuelo, setModalVuelo] = useState(false);
  const [slide, setSlide] = useState({})

  const obtenerVuelos = async () => {
    try {
      setIsLoading(true);
      setAlerta({ msg: "Obteniendo vuelos" });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/vuelos", config);
      setVuelos(data);
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al obtener los vuelos",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setAlerta({});
    }
  };

  useEffect(() => {
    return () => obtenerVuelos();
  }, [auth]);

  const obtenerDetallesVuelo = async (id) => {
    try {
      setIsLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/vuelos/${id}`, config);
      setVuelo(data);
    } catch (error) {
      console.error(error);
      navigation.navigate("admin");
    } finally {
      setIsLoading(false);
    }
  };

  const vueloSubmit = async (vuelo) => {
    if (vuelo._id) {
      return await editarVuelo(vuelo);
    } else {
      return await crearVuelo(vuelo);
    }
  };

  const crearVuelo = async (vuelo) => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Creando vuelo...",
      });
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { estado, ...dataVuelo } = vuelo?.infoVuelo;
      const idVuelo = generarID();

      const { data } = await clienteAxios.post(
        "/vuelos",
        { infoVuelo: dataVuelo, idVuelo },
        config
      );
      setAlerta({
        msg: "Vuelo Creado Exitosamente",
        status: true,
      });
      setVuelos([...vuelos, data]);
      setModalVuelo(false);
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al crear el vuelo",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const editarVuelo = async (vuelo) => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Actualizando vuelo...",
      });
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/vuelos/${vuelo._id}`,
        vuelo,
        config
      );
      const vuelosActualizados = vuelos.map((vueloState) =>
        vueloState._id == data._id ? data : vueloState
      );

      setVuelo(data);
      setVuelos(vuelosActualizados);
      setAlerta({
        msg: "Actualización Exitosa",
        status: true,
      });
      setModalVuelo(false);
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al actualizar el vuelo",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleCancelarVuelo = async () => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Cancelando vuelo...",
      });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/vuelos/${vuelo._id}/cancelar`, config)
      setVuelo(data); // Asumo que `vuelo` está definido en algún lugar del componente
      const vuelosActualizados = vuelos.map(vuelo => vuelo._id == data._id ? data : vuelo)
      setVuelos(vuelosActualizados);
      setAlerta({
        msg: "Vuelo cancelado exitosamente",
        status: true,
      });
      setModalVuelo(false);
    } catch (error) {
      console.error(error);
      setAlerta({
        msg: error.response?.data.msg || "Error al cancelar el vuelo",
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const asignarAsiento = async (asiento) => {
    try {
      const token = await AsyncStorage.getItem('token')

      if(!token){
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/vuelos/pasajero/${vuelo?._id}`, {asiento}, config)
      setSlide({
        msg: data.msg,
        state: 'success'
      })
      navigation.navigate("passenger");
    } catch (error) {
      setSlide({
        msg: error.response.data.msg,
        state: 'error'
      })
    }finally{
      setModalAsiento(false)
      setTimeout(() => {
        setSlide({})
      }, 3000);
    }
  }

  const handleModalVuelo = () => {
    setModalVuelo(!modalVuelo);
  };

  return (
    <VueloContext.Provider
      value={{
        vuelos,
        vuelo,
        setVuelo,
        alerta,
        slide,
        isLoading,
        obtenerVuelos,
        obtenerDetallesVuelo,
        vueloSubmit,
        modalAsiento,
        setModalAsiento,
        pasajero,
        setPasajero,
        modalVuelo,
        setModalVuelo,
        handleModalVuelo,
        handleCancelarVuelo,
        asignarAsiento
      }}
    >
      {children}
    </VueloContext.Provider>
  );
};

export { VueloProvider };

export default VueloContext;
