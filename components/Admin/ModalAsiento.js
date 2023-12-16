import { Modal, VStack, HStack, Text, Badge } from "native-base";

export default function ModalAsiento({
  pasajero,
  modalAsiento,
  handleModalAsiento,
}) {
  return (
    <Modal size={'xl'} isOpen={modalAsiento} onClose={handleModalAsiento}>
      <Modal.Content bg={"#fff"}>
          <Modal.Header width={'100%'}>
            <Text textTransform={'uppercase'} fontWeight={900}>Asiento {pasajero?.asiento || pasajero}</Text>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              {pasajero?.usuario && (
                <>
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text fontWeight="medium">Nombre Pasajero</Text>
                    <Text color="blueGray.400">{pasajero?.usuario?.username}</Text>
                  </HStack>
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text fontWeight="medium">Email Pasajero</Text>
                    <Text color="blueGray.400">{pasajero?.usuario?.email}</Text>
                  </HStack>
                </>
              )}
              <HStack alignItems="center" justifyContent="sbpace-between">
                <Text fontWeight="medium">Estado Asiento</Text>
                <Badge
                  mt={2}
                  ml={"auto"}
                  colorScheme={
                    pasajero?.usuario ? 'danger' : 'success'
                  }
                  alignSelf="center"
                  variant={"solid"}
                >
                  <Text
                    fontSize={"12px"}
                    color={"#fff"}
                    textTransform={"uppercase"}
                  >
                    {pasajero?.usuario ? 'No disponible' : 'Disponible'}
                  </Text>
                </Badge>
              </HStack>
            </VStack>
          </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
