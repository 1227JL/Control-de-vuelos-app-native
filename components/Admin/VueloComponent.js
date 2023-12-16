import { Box, Text, HStack, Badge, VStack } from "native-base";
import { Image } from "react-native";
import formatearFecha from "../../helpers/FormatearFecha";
import obtenerDiferenciaFechas from "../../helpers/ObtenerDiferenciaFechas";

export default function VueloComponent({
  item,
  isHovered,
  isFocused,
  isPressed,  
}) {
  const diferenciaFormateada = obtenerDiferenciaFechas(item?.infoVuelo?.fechaSalida,item?.infoVuelo?.fechaLlegada);

  return (
    <Box alignItems="center" px={2} my={2}>
      <VStack
        style={{
          transform: [
            {
              scale: isPressed ? 0.96 : 1,
            },
          ],
        }}
        px={5}
        pb={4}
        py={2}
        rounded="8"
        shadow={3}
        borderColor="coolGray.300"
        width={"100%"}
      >
        <HStack alignItems="center" justifyContent={"space-between"}>
          <Text color={"text.40"} fontWeight={600}>
            ID: <Text>{item?.idVuelo}</Text>
          </Text>
          <Image
            style={{ width: 48, height: 48 }}
            source={{
              uri: `${process.env.BACKEND_URL}/imagenes/aerolineas/${item?.infoVuelo?.aerolinea?.imagen}`,
            }}
          />
        </HStack>
        <HStack space={3}>
          <Image
            style={{ width: 50, height: 180, marginTop: 25 }}
            source={require("../../public/imagenes/fromToIcon.png")}
          />
          <Box width={"100%"} pr={16}>
            <Box mb={2} justifyContent={"space-between"}>
              <HStack alignItems="center" space={3}>
                <HStack
                  alignItems="center"
                  width={"100%"}
                  space={2}
                >
                  <Text
                    textTransform={"uppercase"}
                    fontSize={"2xl"}
                    fontWeight={900}
                  >
                    {item?.infoVuelo?.origen?.codigoIATA}
                  </Text>
                  <Text
                    textTransform={"uppercase"}
                    fontSize={"sm"}
                    fontWeight={900}
                  >
                    {item?.infoVuelo?.origen?.nombre}
                  </Text>
                </HStack>
              </HStack>
              <Text textTransform={"capitalize"} fontSize={"sm"}>
                {formatearFecha(item?.infoVuelo?.fechaSalida)}
              </Text>
              <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                {item?.infoVuelo?.origen?.aeropuerto}
              </Text>
            </Box>
            <Box>
              <Text color={"primary.700"}>Tiempo de Vuelo</Text>
              <Text color={"primary.700"}>
                {diferenciaFormateada.dias > 0 && (
                  <Text>
                    {diferenciaFormateada.dias}{" "}
                    {diferenciaFormateada.días == 1 ? "día" : "días"}{" "}
                  </Text>
                )}
                {diferenciaFormateada.horas > 0 && (
                  <Text>
                    {diferenciaFormateada.horas}{" "}
                    {diferenciaFormateada.horas == 1 ? "hora" : "horas"}{" "}
                  </Text>
                )}
                {diferenciaFormateada.minutos > 0 && (
                  <Text>{diferenciaFormateada.minutos} minutos</Text>
                )}
              </Text>
            </Box>
            <Box>
              <HStack alignItems="center" space={3}>
                <Text
                  textTransform={"uppercase"}
                  fontSize={"2xl"}
                  fontWeight={900}
                >
                  {item?.infoVuelo?.destino?.codigoIATA}
                </Text>
                <Text
                  textTransform={"uppercase"}
                  fontSize={"sm"}
                  fontWeight={900}
                >
                  {item?.infoVuelo?.destino?.nombre}
                </Text>
              </HStack>
              <Text textTransform={"capitalize"} fontSize={"sm"}>
                {formatearFecha(item?.infoVuelo?.fechaLlegada)}
              </Text>
              <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                {item?.infoVuelo?.destino?.aeropuerto}
              </Text>
            </Box>
            <Badge
              mt={2}
              ml={"auto"}
              colorScheme={
                item?.infoVuelo?.estado === "Pendiente"
                  ? "dark"
                  : item?.infoVuelo?.estado === "Activo"
                  ? "success"
                  : item?.infoVuelo?.estado === "Realizado"
                  ? "primary"
                  : "danger"
              }
              alignSelf="center"
              variant={"solid"}
            >
              <Text
                fontSize={"12px"}
                color={"#fff"}
                textTransform={"uppercase"}
              >
                {item?.infoVuelo?.estado}
              </Text>
            </Badge>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}
