import { Box, Text, HStack, VStack, Image } from "native-base";
import formatearFecha from "../../helpers/FormatearFecha";
import obtenerDiferenciaFechas from "../../helpers/ObtenerDiferenciaFechas";

export default function VueloComponent({
  item,
  isHovered,
  isFocused,
  isPressed,
}) {
  const diferenciaFormateada = obtenerDiferenciaFechas(
    item?.infoVuelo?.fechaSalida,
    item?.infoVuelo?.fechaLlegada
  );

  return (
    <VStack
      style={{
        transform: [
          {
            scale: isPressed ? 0.96 : 1,
          },
        ],
      }}
      space={2}
      mb={5}
      rounded="8"
      borderColor="coolGray.300"
      borderWidth={1}
      width={"100%"}
    >
      <Box flexDirection="row" alignItems="center">
        <Image
          src={`${process.env.BACKEND_URL}/imagenes/destinos/${item?.infoVuelo?.destino?.imagen}`}
          alt="Imagen Derecha"
          roundedTop={8}
          w="100%" // El 50% del ancho para cada imagen
          h={32}
          resizeMode="cover"
        />
      </Box>
      <Box p={3}>
        <HStack alignItems="center" justifyContent={"space-between"}>
          <Text textTransform={"uppercase"} color={"text.40"} fontWeight={600}>
            Vuelo <Text>{item?.idVuelo}</Text>
          </Text>
          <Image
            alt={`Imagen ciudad destino: ${item?.infoVuelo?.destino?.nombre}`}
            style={{ width: 32, height: 32, objectFit: "contain" }}
            source={{
              uri: `${process.env.BACKEND_URL}/imagenes/aerolineas/${item?.infoVuelo?.aerolinea?.imagen}`,
            }}
          />
        </HStack>
        <VStack w={"full"} space={1}>
          <HStack alignItems="center" space={1}>
            <HStack alignItems="center" width={"100%"} space={1}>
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
        </VStack>
      </Box>
    </VStack>
  );
}
