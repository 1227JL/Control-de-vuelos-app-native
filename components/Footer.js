import React, {useState} from 'react';
import { NativeBaseProvider, Box, Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, Fontisto } from '@expo/vector-icons';

export default function Footer() {
    const [selected, setSelected] = useState(1);
    return (
        <NativeBaseProvider>
            <Box mt={'auto'} width="100%" alignSelf="center">
                <HStack bg={"#BF0006"} alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                        <Center>
                            <Icon mb="1" as={<Ionicons name={selected === 1 ? 'airplane' : 'airplane-outline'} size={24} color="black" />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Vuelos
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
                        <Center>
                            <Icon mb="1" as={<MaterialIcons name="place" size={24} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Destinos
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                        <Center>
                            <Icon mb="1" as={<Fontisto name="world" size={24} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Aerolineas
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Mi cuenta
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    )
}
