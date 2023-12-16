import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image } from "react-native";
import {
  Text,
  Pressable,
  Box,
  Input,
  WarningOutlineIcon,
  FormControl,
} from "native-base"; // Importa componentes de NativeBase
import Link from "../components/Link";
import LoadingModal from "../components/LoadingModal";
import useAuth from "../hooks/useAuth";

export default function Registro() {
  const navigation = useNavigation();
  const { registrar } = useAuth()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [usernameIsInvalid, setUsernameIsInvalid] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState("");
  const [repetirPasswordIsInvalid, setRepetirPasswordIsInvalid] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameIsInvalid(true);
    } else {
      setUsernameIsInvalid(false);
    }

    // Verificación de la contraseña
    if (email === "") {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }

    // Verificación de la contraseña
    if (password === "") {
      setPasswordIsInvalid(true);
    } else {
      setPasswordIsInvalid(false);
    }

    if (repetirPassword === "") {
      setRepetirPasswordIsInvalid({
        isInvalid: true,
        error: "Campo requerido",
      });
      console.log(repetirPasswordIsInvalid);
    }

    if (repetirPassword !== password) {
      setRepetirPasswordIsInvalid({
        isInvalid: true,
        error: "Los passwords deben coincidir",
      });
      console.log(repetirPasswordIsInvalid);
    } else {
      setRepetirPasswordIsInvalid({});
    }

    // Si deseas devolverte si uno de ellos es inválido, puedes hacerlo de la siguiente manera:
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      repetirPassword === ""
    ) {
      return;
    }

    await registrar({username, email, password})
  };

  return (
    <>
      <Box flex={1} p={4} justifyContent="center">
        {" "}
        {/* Utiliza Box en lugar de View para aplicar estilos de NativeBase */}
        <Box alignItems="center">
          <Image
            source={require("../public/imagenes/_c477bf10-cc26-4083-8174-9188f4a7073f.png")}
            style={styles.imagen}
          />
        </Box>
        <Box p={4}>
          {" "}
          {/* Aplica sombra y colores de NativeBase */}
          <Text
            fontSize={24}
            fontWeight="bold"
            mb={4}
            color="gray.700"
            textAlign="center"
          >
            Registrar
          </Text>
          <Box alignItems="center">
            <FormControl isInvalid={usernameIsInvalid}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                color={"gray.600"}
                bgColor={"bg.50"}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Campo requerido
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={emailIsInvalid}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Email de registro"
                value={email}
                onChangeText={setEmail}
                color={"gray.600"}
                bgColor={"bg.50"}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Campo requerido
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={passwordIsInvalid}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Ingresa tu password"
                type={"password"}
                value={password}
                onChangeText={setPassword}
                color={"gray.600"}
                bgColor={"bg.50"}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Campo requerido
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={repetirPasswordIsInvalid?.isInvalid}>
              <FormControl.Label>Repetir Password</FormControl.Label>
              <Input
                placeholder="Repite tu password"
                type={"password"}
                value={repetirPassword}
                onChangeText={setRepetirPassword}
                color={"gray.600"}
                bgColor={"bg.50"}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {repetirPasswordIsInvalid?.error}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          ;
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </Pressable>
          <Link
            screenName={"login"}
            linkText={"Ya tienes una cuenta? Inicia Sesión"}
          />
        </Box>
      </Box>
      {loading && <LoadingModal isVisible={loading} alerta={alerta} />}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(239 68 68)",
    padding: 15,
    color: "#fff",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    textTransform: "uppercase",
  },
  imagen: {
    width: 200, // Ajusta el ancho de la imagen según tus necesidades
    height: 200, // Ajusta la altura de la imagen según tus necesidades
  },
  containerImage: {
    display: "flex",
    alignItems: "center",
  },
});
