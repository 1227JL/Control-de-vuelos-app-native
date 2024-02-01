import { FlatList, Heading, Text, View, Pressable } from 'native-base'
import React, { useState } from 'react'
import useVuelo from '../../hooks/useVuelo'
import LoadingBox from '../../components/LoadingBox'
import { RefreshControl } from 'react-native-gesture-handler'
import VueloComponent from '../../components/User/VueloComponent'
import LoadingModal from '../../components/LoadingModal'
import { useNavigation } from "@react-navigation/native";

export default function Vuelos() {
  const { vuelos, isLoading, alerta, obtenerVuelos } = useVuelo()
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerVuelos();
    setRefreshing(false);
  };

  const navigation = useNavigation();

  const handlePress = (itemId) => {
    navigation.navigate("vuelo-user", { id: itemId });
  };

  if (isLoading && Object.values(alerta).length > 0)
  return <LoadingModal isVisible={isLoading} alerta={alerta} />;

  return (
    <View>
      <Heading  textTransform={"capitalize"} fontSize="xl" p="3" pb={2} py={0}>Vuelos Disponiles</Heading>

      {isLoading ? (
        <LoadingBox isVisible={isLoading} alerta={alerta} />
      ) : vuelos.length > 0 ? (
        <FlatList
          data={vuelos}
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
          No hay vuelos disponibles aun
        </Heading>
      )}
    </View>
  )
}
