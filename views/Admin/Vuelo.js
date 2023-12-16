import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  CircleIcon,
  Skeleton,
  ScrollView,
  View,
  Center,
  Button,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import useVuelo from "../../hooks/useVuelo";
import AirplaneSeat from "../../components/AirplaneSeat";
import ModalAsiento from "../../components/Admin/ModalAsiento";
import VueloComponent from "../../components/Admin/VueloComponent";
import { RefreshControl } from "react-native-gesture-handler";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import LoadingModal from "../../components/LoadingModal";
import ModalVuelo from "../../components/Admin/ModalVuelo";

export default function Vuelo() {
  const route = useRoute();
  const {
    isLoading,
    alerta,
    vuelo,
    obtenerDetallesVuelo,
    modalAsiento,
    setModalAsiento,
    pasajero,
    setPasajero,
    handleModalVuelo,
    handleCancelarVuelo
  } = useVuelo();
  const [refreshing, setRefreshing] = useState(false);

  const { id } = route.params || {}; // Asegúrate de obtener id de manera segura

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerDetallesVuelo(id || vuelo._id);

    setRefreshing(false);
  };

  const handleModalAsiento = async (numRef) => {
    setModalAsiento(!modalAsiento);

    const pasajero = vuelo?.infoVuelo?.pasajeros?.filter(
      (pasajero) => pasajero.asiento === numRef
    );
    setPasajero(pasajero[0] || numRef);
  };

  useEffect(() => {
    if (id || vuelo?._id) {
      obtenerDetallesVuelo(id != undefined ? id : vuelo?._id);
    }
  }, [id]);

  const alphabet = "ABCDEF";
  const seatsPerRow = 6; // Ajusta según tus necesidades
  const numberOfRows = 20; // Ajusta según tus necesidades

  const renderAirplaneSeatRow = (rowNumber) => {
    const seats = [];

    for (let i = 0; i < seatsPerRow; i++) {
      const seatId = `${alphabet[i]}${rowNumber + 1}`;
      seats.push(
        <AirplaneSeat
          pasajeros={vuelo?.infoVuelo?.pasajeros}
          handleModalAsiento={handleModalAsiento}
          key={seatId}
          numRef={seatId}
        />
      );
    }

    const leftSeats = seats.slice(0, seatsPerRow / 2);
    const rightSeats = seats.slice(seatsPerRow / 2);

    return (
      <View
        key={rowNumber}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View flexDirection={"row"}>{leftSeats}</View>
        <View style={{ width: 10 }} />
        <View flexDirection={"row"}>{rightSeats}</View>
      </View>
    );
  };

  const renderAirplaneSeatRows = () => {
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      rows.push(renderAirplaneSeatRow(i));
    }

    return rows;
  };

  if (isLoading && Object.keys(alerta).length == 0) {
    // Muestra el esqueleto mientras isLoading es verdadero
    return (
      <Center w="100%">
        <VStack w="90%" maxW="400" space={2} overflow="hidden" rounded="md">
          <Skeleton size="5" rounded={0} w={"100%"} />
          <Skeleton startColor="gray.200" h="375" />
          <Skeleton size="5" rounded={0} w={"100%"} />
          <HStack space={8} justifyContent={"space-between"}>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
            </HStack>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={45} />
            </HStack>
          </HStack>
          <HStack space={8} justifyContent={"space-between"}>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
            </HStack>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={45} />
            </HStack>
          </HStack>
          <HStack space={8} justifyContent={"space-between"}>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
            </HStack>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={45} />
            </HStack>
          </HStack>
          <HStack space={8} justifyContent={"space-between"}>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
            </HStack>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={45} />
            </HStack>
          </HStack>
          <HStack space={8} justifyContent={"space-between"}>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
            </HStack>
            <HStack space={2}>
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={42} />
              <Skeleton startColor="gray.200" rounded={5} h={42} w={45} />
            </HStack>
          </HStack>
        </VStack>
      </Center>
    );
  }

  if (isLoading && Object.values(alerta).length > 0)
    return <LoadingModal isVisible={isLoading} alerta={alerta} />;

  return (
    <>
      <Box>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Heading px={2}>Información Vuelo</Heading>
            {vuelo?.infoVuelo?.estado === "Pendiente" && (
              <HStack space={2}>
                <FontAwesome
                  onPress={handleModalVuelo}
                  name="pencil"
                  size={24}
                  color="black"
                />
                <MaterialCommunityIcons onPress={handleCancelarVuelo} name="cancel" size={24} color="black" />
              </HStack>
            )}
          </HStack>
          <VueloComponent item={vuelo} />
          <VStack px={2}>
            <HStack
              mb={3}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading mt={2}>Asientos</Heading>
              <HStack mt={2} space={2} alignItems={"center"}>
                <HStack space={2} alignItems={"center"}>
                  <Box>
                    <CircleIcon color={"r.100"} />
                  </Box>
                  <Text>No disponible</Text>
                </HStack>
                <HStack space={2} alignItems={"center"}>
                  <Box>
                    <CircleIcon color={"#bbb"} />
                  </Box>
                  <Text>Disponible</Text>
                </HStack>
              </HStack>
            </HStack>
            <View>{renderAirplaneSeatRows()}</View>
          </VStack>
        </ScrollView>
      </Box>
      <ModalAsiento
        pasajero={pasajero}
        modalAsiento={modalAsiento}
        handleModalAsiento={handleModalAsiento}
      />
      <ModalVuelo />
    </>
  );
}
