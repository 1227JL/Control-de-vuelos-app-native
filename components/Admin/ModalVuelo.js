import {
  Modal,
  Text,
  Select,
  CheckIcon,
  FormControl,
  WarningOutlineIcon,
  Button,
  Box,
} from "native-base";
import { useState, useEffect } from "react";
import useAerolinea from "../../hooks/useAerolinea";
import useDestino from "../../hooks/useDestino";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import formatearSoloFecha from "../../helpers/FormatearSoloFecha";
import {
  formatearSoloHoraMinutos,
  obtenerSoloHora,
} from "../../helpers/formatearSoloHoraMinutos";
import useVuelo from "../../hooks/useVuelo";
import obtenerSoloFecha from "../../helpers/ObtenerSoloFecha";

export default function ModalVuelo() {
  const { aerolineas, obtenerAerolineas } = useAerolinea();
  const { destinos, obtenerDestinos } = useDestino();
  const { vueloSubmit, vuelo, modalVuelo, handleModalVuelo } = useVuelo();
  const [selectedAerolinea, setSelectedAerolinea] = useState(
    vuelo?.infoVuelo?.aerolinea?._id || ""
  );
  const [selectedOrigen, setSelectedOrigen] = useState(
    vuelo?.infoVuelo?.origen?._id || ""
  );
  const [selectedDestino, setSelectedDestino] = useState(
    vuelo?.infoVuelo?.destino?._id || ""
  );
  const [dateSalida, setDateSalida] = useState(new Date());
  const [timeSalida, setTimeSalida] = useState(new Date());
  const [dateLlegada, setDateLlegada] = useState(new Date());
  const [timeLlegada, setTimeLlegada] = useState(new Date());
  const [showDateSalida, setShowDateSalida] = useState(false);
  const [showTimeSalida, setShowTimeSalida] = useState(false);
  const [showDateLlegada, setShowDateLlegada] = useState(false);
  const [showTimeLlegada, setShowTimeLlegada] = useState(false);
  const [estado, setEstado] = useState(vuelo?.infoVuelo?.estado || "");
  const [loading, setLoading] = useState(false);

  const onChangeDateSalida = (event, selectedDate) => {
    const currentDate = selectedDate || dateSalida;
    setShowDateSalida(false);
    setDateSalida(currentDate);
  };

  const onChangeDateLlegada = (event, selectedDate) => {
    const currentDate = selectedDate || dateLlegada;
    setShowDateLlegada(false);
    setDateLlegada(currentDate);
  };

  const onChangeTimeSalida = (event, selectedTime) => {
    setShowTimeSalida(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const updatedDate = new Date(timeSalida);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      setTimeSalida(updatedDate);
    }
  };
  const onChangeTimeLlegada = (event, selectedTime) => {
    setShowTimeLlegada(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const updatedDate = new Date(timeLlegada);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      setTimeLlegada(updatedDate);
    }
  };

  const showDatePickerSalida = () => {
    setShowDateSalida(true);
  };

  const showTimePickerSalida = () => {
    setShowTimeSalida(true);
  };

  const showDatePickerLlegada = () => {
    setShowDateLlegada(true);
  };

  const showTimePickerLlegada = () => {
    setShowTimeLlegada(true);
  };

  const handleSubmit = async () => {
    if (
      [
        selectedAerolinea,
        selectedOrigen,
        selectedDestino,
        dateSalida,
        timeSalida,
        dateLlegada,
        timeLlegada,
      ].includes("")
    ) {
      return;
    }

    await vueloSubmit({
      _id: vuelo?._id,
      infoVuelo: {
        aerolinea: selectedAerolinea,
        origen: selectedOrigen,
        destino: selectedDestino,
        fechaSalida: dateSalida,
        horaSalida: timeSalida,
        fechaLlegada: dateLlegada,
        horaLlegada: timeLlegada,
        estado,
      },
    });
  };

  useEffect(() => {
    obtenerAerolineas();
    obtenerDestinos();

    // Setear estados si vuelo tiene un objeto válido
    if (vuelo && Object.keys(vuelo).length > 0) {
      setSelectedAerolinea(vuelo?.infoVuelo?.aerolinea?._id);
      setSelectedOrigen(vuelo?.infoVuelo?.origen?._id);
      setSelectedDestino(vuelo?.infoVuelo?.destino?._id);
      setDateSalida(new Date(vuelo?.infoVuelo?.fechaSalida));
      setTimeSalida(new Date(vuelo?.infoVuelo?.horaSalida));
      setDateLlegada(new Date(vuelo?.infoVuelo?.fechaLlegada));
      setTimeLlegada(new Date(vuelo?.infoVuelo?.horaLlegada));
      setEstado(vuelo?.infoVuelo?.estado);
    }
  }, []);

  return (
    <Modal size={"xl"} isOpen={modalVuelo} onClose={handleModalVuelo}>
      <Modal.Content bg={"#fff"}>
        <Modal.Header width={"100%"}>
          <Text textTransform={"uppercase"} fontWeight={900}>
            {vuelo?.idVuelo ? `Editar Vuelo ${vuelo?.idVuelo}` : "Crear Vuelo"}
          </Text>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <FormControl isRequired isInvalid={selectedAerolinea ? false : true}>
            <FormControl.Label>Aerolinea</FormControl.Label>
            <Select
              selectedValue={selectedAerolinea}
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              defaultValue={vuelo?.aerolinea}
              mt={1}
              onValueChange={(itemValue) => setSelectedAerolinea(itemValue)}
            >
              {aerolineas?.map((aerolinea) => (
                <Select.Item
                  key={aerolinea?._id}
                  label={aerolinea?.nombre}
                  value={aerolinea?._id}
                />
              ))}
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una aerolinea
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={selectedOrigen ? false : true}>
            <FormControl.Label>Origen</FormControl.Label>
            <Select
              selectedValue={selectedOrigen}
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setSelectedOrigen(itemValue)}
            >
              {destinos?.map((origen) => (
                <Select.Item
                  key={origen._id}
                  label={`${origen.nombre} (${origen.codigoIATA})`}
                  value={origen._id}
                />
              ))}
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una ciudad de origen
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={dateSalida ? false : true}>
            <FormControl.Label>Fecha salida</FormControl.Label>
            <Box
              flexDirection={"row"}
              borderColor={"#ccc"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderWidth={1}
              padding={2}
              borderRadius={5}
            >
              <Text>{formatearSoloFecha(obtenerSoloFecha(dateSalida))}</Text>
              <Fontisto
                onPress={showDatePickerSalida}
                name="date"
                size={24}
                color="black"
              />
            </Box>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una fecha de salida
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={timeSalida ? false : true}>
            <FormControl.Label>Hora salida</FormControl.Label>
            <Box
              flexDirection={"row"}
              borderColor={"#ccc"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderWidth={1}
              padding={2}
              borderRadius={5}
            >
              <Text>
                {formatearSoloHoraMinutos(obtenerSoloHora(timeSalida))}
              </Text>
              <FontAwesome5
                onPress={showTimePickerSalida}
                name="clock"
                size={24}
                color="black"
              />
            </Box>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una hora de salida
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={selectedDestino ? false : true}>
            <FormControl.Label>Destino</FormControl.Label>
            <Select
              selectedValue={selectedDestino}
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              defaultValue={vuelo.aerolinea}
              mt={1}
              onValueChange={(itemValue) => setSelectedDestino(itemValue)}
            >
              {destinos?.map((destino) => (
                <Select.Item
                  key={destino._id}
                  label={`${destino.nombre} (${destino.codigoIATA})`}
                  value={destino._id}
                />
              ))}
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una ciudad destino
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={dateLlegada ? false : true}>
            <FormControl.Label>Fecha llegada</FormControl.Label>
            <Box
              flexDirection={"row"}
              borderColor={"#ccc"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderWidth={1}
              padding={2}
              borderRadius={5}
            >
              <Text>{formatearSoloFecha(obtenerSoloFecha(dateLlegada))}</Text>
              <Fontisto
                onPress={showDatePickerLlegada}
                name="date"
                size={24}
                color="black"
              />
            </Box>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una fecha de llegada
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={timeLlegada ? false : true}>
            <FormControl.Label>Hora llegada</FormControl.Label>
            <Box
              flexDirection={"row"}
              borderColor={"#ccc"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderWidth={1}
              padding={2}
              borderRadius={5}
            >
              <Text>
                {formatearSoloHoraMinutos(obtenerSoloHora(timeLlegada))}
              </Text>
              <FontAwesome5
                onPress={showTimePickerLlegada}
                name="clock"
                size={24}
                color="black"
              />
            </Box>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Selecciona una hora de salida
            </FormControl.ErrorMessage>
          </FormControl>
          {vuelo?._id && (
            <FormControl isRequired isInvalid={estado ? false : true}>
              <FormControl.Label>Estado vuelo</FormControl.Label>
              <Select
                selectedValue={estado}
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setEstado(itemValue)}
              >
                <Select.Item label="Pendiente" value="Pendiente" />
                <Select.Item label="Activo" value="Activo" />
                <Select.Item label="Realizado" value="Realizado" />
              </Select>

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Selecciona una fecha de llegada
              </FormControl.ErrorMessage>
            </FormControl>
          )}

          {showDateSalida && (
            <DateTimePicker
              testID="dateTimePickerTime"
              value={dateSalida}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDateSalida}
            />
          )}
          {showTimeSalida && (
            <DateTimePicker
              testID="dateTimePickerTime"
              value={timeSalida}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimeSalida}
            />
          )}

          {showDateLlegada && (
            <DateTimePicker
              testID="dateTimePickerTime"
              value={dateLlegada}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDateLlegada}
            />
          )}
          {showTimeLlegada && (
            <DateTimePicker
              testID="dateTimePickerTime"
              value={timeLlegada}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimeLlegada}
            />
          )}
          <Button
            bg={"r.100"}
            colorScheme="danger" // Cambié isPressed a variant para especificar el color de fondo
            disabled={loading}
            onPress={handleSubmit}
            mt={5}
          >
            {vuelo?._id ? 'Editar Vuelo' : 'Crear Vuelo'}
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
