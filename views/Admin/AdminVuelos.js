import { Heading, FlatList, Pressable, HStack, Menu, Text } from "native-base";
import React, { useEffect, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import VueloComponent from "../../components/Admin/VueloComponent";
import useVuelo from "../../hooks/useVuelo";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native-gesture-handler";
import ModalVuelo from "../../components/Admin/ModalVuelo";
import LoadingModal from "../../components/LoadingModal";

export default function AdminVuelos() {
  const { vuelos, alerta, isLoading, obtenerVuelos, handleModalVuelo } =
    useVuelo();
  const [filter, setFilter] = useState("");
  const [vuelosFiltrados, setVuelosFiltrados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onchangeFilter = (value) => {
    setFilter(value);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerVuelos();
    setRefreshing(false);
  };

  useEffect(() => {
    const vuelosFiltrados = vuelos?.filter((vuelo) =>
      vuelo.infoVuelo.estado.toLowerCase().includes(filter.trim().toLowerCase())
    );
    setVuelosFiltrados(vuelosFiltrados);
  }, [filter]);

  const navigation = useNavigation();

  const handlePress = (itemId) => {
    navigation.navigate("vuelo", { id: itemId });
  };

  if (isLoading && Object.values(alerta).length > 0)
    return <LoadingModal isVisible={isLoading} alerta={alerta} />;

  return (
    <>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Heading textTransform={"capitalize"} fontSize="xl" p="3" pb={2} py={0}>
          Vuelos {filter != "" && `${filter}s`}
        </Heading>
        <HStack alignItems={"center"}>
          <Menu
            w="190"
            mr={7}
            trigger={(triggerProps) => {
              return (
                <Pressable
                  mr={2}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <FontAwesome name="filter" size={24} color="black" />
                </Pressable>
              );
            }}
          >
            <Menu.Item
              isDisabled={filter === ""}
              onPress={() => onchangeFilter("")}
            >
              Todos
            </Menu.Item>
            <Menu.Item
              isDisabled={filter === "Pendiente"}
              onPress={() => onchangeFilter("Pendiente")}
            >
              Vuelos Pendientes
            </Menu.Item>
            <Menu.Item
              isDisabled={filter === "Activo"}
              onPress={() => onchangeFilter("Activo")}
            >
              Vuelos Activos
            </Menu.Item>
            <Menu.Item
              isDisabled={filter === "Realizado"}
              onPress={() => onchangeFilter("Realizado")}
            >
              Vuelos Realizados
            </Menu.Item>
            <Menu.Item
              isDisabled={filter === "Cancelado"}
              onPress={() => onchangeFilter("Cancelado")}
            >
              Vuelos Cancelados
            </Menu.Item>
          </Menu>
          <AntDesign
            onPress={handleModalVuelo}
            name="plussquareo"
            size={24}
            color="black"
          />
        </HStack>
      </HStack>
      {isLoading ? (
        <LoadingBox isVisible={isLoading} alerta={alerta} />
      ) : vuelos.length > 0 ? (
        <FlatList
          data={vuelosFiltrados.length > 0 ? vuelosFiltrados : vuelos}
          width={"100%"}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable width={"100%"} onPress={() => handlePress(item?._id)}>
              {({ isHovered, isFocused, isPressed }) => (
                <VueloComponent
                  key={item?._id}
                  item={item}
                  isHovered={isHovered}
                  isFocused={isFocused}
                  isPressed={isPressed}
                />
              )}
            </Pressable>
          )}
          keyExtractor={(item) => item.idVuelo}
        />
      ) : (
        <Heading textTransform={"capitalize"} fontWeight={400} fontSize="lg" p="3" pb={2} py={0}>
          No hay vuelos creados aun
        </Heading>
      )}
      <ModalVuelo />
    </>
  );
}
