import {
  Heading,
  Modal,
  Text,
  Button,
  VStack,
  View,
  Pressable,
} from "native-base";
import { StyleSheet } from "react-native";
import useVuelo from "../../hooks/useVuelo";

export default function ModalAsientoUser({
  modalAsiento,
  handleModalAsiento,
  asiento,
}) {
  const { asignarAsiento } = useVuelo();

  const handleSubmit = async () => {
    await asignarAsiento(asiento);
  };

  return (
    <Modal isOpen={modalAsiento} size={"xl"} onClose={handleModalAsiento}>
      <Modal.Content>
        <Modal.Header
          flexDirection={"row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Text textTransform={"uppercase"} fontWeight={900}>
            Asignación de Asiento
          </Text>
          <Button
            variant="unstyled"
            _hover={{ backgroundColor: "gray.200" }}
            p={2}
            borderRadius="full"
            onPress={handleModalAsiento}
          >
            <Text color="gray.600" fontWeight={700}>
              X
            </Text>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <VStack space={2}>
              <Heading size={"sm"}>Asiento Seleccionado</Heading>
              <View style={seatStyle}>
                <Text style={styles.seatNumber}>{asiento}</Text>
              </View>
            </VStack>
            <Pressable onPress={handleSubmit} style={styles.button}>
              {({ isHovered, isFocused, isPressed }) => (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    fontSize: 13,
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                >
                  Confirmar Selección de Asiento
                </Text>
              )}
            </Pressable>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  seatNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#BF0006",
    padding: 15,
    borderRadius: 5,
  },
});

const seatStyle = {
  width: 45,
  height: 45,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  margin: 3,
  backgroundColor: "#bbb",
};
