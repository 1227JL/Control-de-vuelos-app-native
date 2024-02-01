import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      setCargando(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/perfil", config);
        setAuth(data);
        if (data?.rol == "Administrador") {
          navigation.navigate("admin");
        } else {
          navigation.navigate("passenger");
        }
      } catch (error) {
        console.log(error);
        setAlerta({
          msg: error.response?.data.msg || "Error al autenticar el usuario",
        });
      } finally {
        setTimeout(() => {
          setAlerta({});
          setCargando(false);
        }, 1000);
      }
    };

    autenticarUsuario();
  }, []);

  const autenticar = async (credentials) => {
    try {
      setCargando(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await clienteAxios.post("/login", credentials, config);
      setAuth(data);
      setAlerta({
        msg: "Autenticación exitosa",
      });
      await AsyncStorage?.setItem("token", data?.token);
      if (data?.rol == "Administrador") {
        navigation.navigate("admin");
      } else {
        navigation.navigate("passenger");
      }
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response?.data.msg || "Error al autenticar el usuario",
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
        setCargando(false);
      }, 1000);
    }
  };

  const registrar = async (user) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await clienteAxios.post("/", user, config);

      setAlerta({
        msg: "Usuario registrado exitosamente",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAlerta({
        msg: error.response?.data.msg || "Error al registrar el usuario",
      });
      setTimeout(() => {
        setAlerta({});
        setCargando(false);
      }, 10000);
    }
  };

  const cerrarSesion = async () => {
    setAuth({});
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        autenticar,
        registrar,
        cerrarSesion,
        setAuth,
        cargando,
        alerta,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
