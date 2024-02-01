import React, { useState } from "react";
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
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { autenticar } = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación del nombre de usuario
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

    // Si uno de ellos es inválido, no continúes
    if (email === "" || password === "") {
      return;
    }

    await autenticar({email, password})

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
            Inicia Sesión
          </Text>
          <Box alignItems="center">
            <FormControl isInvalid={emailIsInvalid}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Email del registro"
                type="email"
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
          </Box>
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </Pressable>
          <Link
            screenName={"registro"}
            linkText={"¿No tienes una cuenta? Registrate"}
          />
        </Box>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    backgroundColor: "rgb(239 68 68)",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    textTransform: "uppercase",
  },
  imagen: {
    width: 200,
    height: 200,
  },
});
