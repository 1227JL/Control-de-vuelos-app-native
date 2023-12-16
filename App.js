// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import Login from "./views/Login";
import Registro from "./views/Registro";
import AdminVuelos from "./views/Admin/AdminVuelos";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import Vuelo from "./views/Admin/Vuelo";
import { AuthProvider } from "./context/AuthProvider";
import { VueloProvider } from "./context/VueloProvider";

const theme = extendTheme({
  colors: {
    r: {
      100: "#BF0006",
    },
    text: {
      100: "#000000",
      80: "rgba(0, 0, 0, 0.8)",
      60: "rgba(0, 0, 0, 0.6)",
      40: "rgba(0, 0, 0, 0.4)",
      20: "rgba(0, 0, 0, 0.2)",
    },
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
  },
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <VueloProvider>
            <Stack.Navigator>
              <Stack.Group>
                {/* Auth Layout */}
                <Stack.Screen name="login" options={{ headerShown: false }}>
                  {(props) => (
                    <AuthLayout>
                      <Login {...props} />
                    </AuthLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen name="registro" options={{ headerShown: false }}>
                  {(props) => (
                    <AuthLayout>
                      <Registro {...props} />
                    </AuthLayout>
                  )}
                </Stack.Screen>
              </Stack.Group>

              <Stack.Group>
                {/* Admin Layout */}
                <Stack.Screen name="admin" options={{ headerShown: false }}>
                  {(props) => (
                    <AdminLayout>
                      <AdminVuelos {...props} />
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen name="vuelo" options={{ headerShown: false }}>
                  {(props) => (
                    <AdminLayout>
                      <Vuelo {...props} />
                    </AdminLayout>
                  )}
                </Stack.Screen>
              </Stack.Group>
            </Stack.Navigator>
          </VueloProvider>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
