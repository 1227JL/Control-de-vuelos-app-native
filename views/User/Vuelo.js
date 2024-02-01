import { useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Skeleton,
  ScrollView,
  View,
  Center,
  Button,
  CheckCircleIcon,
} from "native-base";
import React, { useState, useEffect } from "react";
import useVuelo from "../../hooks/useVuelo";
import { RefreshControl } from "react-native-gesture-handler";
import VueloComponent from "../../components/User/VueloComponent";
import LoadingModal from "../../components/LoadingModal";
import AirplaneSeat from "../../components/AirplaneSeat";
import ModalAsientoUser from "../../components/User/ModalAsientoUser";

export default function Vuelo() {
  const route = useRoute();
  const { id } = route.params || {};
  const [asiento, setAsiento] = useState('')

  const {
    isLoading,
    alerta,
    vuelo,
    obtenerDetallesVuelo,
    modalAsiento,
    setModalAsiento,
  } = useVuelo();
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerDetallesVuelo(id || vuelo._id);

    setRefreshing(false);
  };

  const handleModalAsiento = async (numRef) => {
    setModalAsiento(!modalAsiento);

    setAsiento(numRef)
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
          <Heading mb={2} px={2}>
            Información del Vuelo
          </Heading>
          <VueloComponent item={vuelo} />
          <VStack px={2}>
            <VStack mb={3}>
              <Heading mt={2}>Escoge tu asiento</Heading>
              <HStack mt={2} space={2} alignItems={"center"}>
                <HStack space={2} alignItems={"center"}>
                  <Box p={2} bgColor={"r.100"} rounded={"full"} />
                  <Text>No disponible</Text>
                </HStack>
                <HStack space={2} alignItems={"center"}>
                  <Box p={2} bgColor={"#bbb"} rounded={"full"} />
                  <Text>Disponible</Text>
                </HStack>
              </HStack>
            </VStack>
            <View>{renderAirplaneSeatRows()}</View>
          </VStack>
        </ScrollView>
      </Box>
      <ModalAsientoUser
        asiento={asiento}
        modalAsiento={modalAsiento}
        handleModalAsiento={handleModalAsiento}
      />
    </>
  );
}
