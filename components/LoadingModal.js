import { View, Text, Modal, Spinner } from 'native-base';

export default function LoadingModal({isVisible, alerta}){
    return (
        <Modal
            isOpen={isVisible}
            transparent
            animationType="slide"
            bg={'#ffff'}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color="#BF0006" size={60} />
                <Text textTransform={'uppercase'} fontWeight={900} mt={2} color={'text.60'}>{alerta?.msg || 'Loading...'}</Text>
            </View>
        </Modal>
    )
}