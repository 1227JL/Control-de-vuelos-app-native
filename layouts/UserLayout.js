import { SafeAreaView } from "react-native";
import { Slide, Alert, Text, Center, Box } from "native-base";
import useVuelo from "../hooks/useVuelo";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const UserLayout = ({ children }) => {
  const { slide } = useVuelo();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Center h="24" position={'absolute'}>
          <Slide in={Object.keys(slide).length > 0} placement="top">
            <Alert
              flexDirection={"row"}
              justifyContent="center"
              status={slide?.state == 'success' ? 'success' : 'error'}
              safeAreaTop={8}
              style={{gap: 5, paddingBottom: 24}}
            >
              {slide?.state == 'success' ? (
                <Entypo name="check" size={24} color="#00CC00" />
              ) : (
                <MaterialIcons name="error" size={24} color="#BF0006" />
              )}
              <Text color={slide?.state == 'success' ? "#00CC00" : "r.100"} fontWeight="medium">
                {slide?.msg}
              </Text>
            </Alert>
          </Slide>
        </Center>
        <Box py={10} px={5} pb={4} bg={"r.100"}>
          <Text color={"#ffff"} fontWeight={900} fontSize={24}>
            AeroLink
          </Text>
        </Box>
        <Box style={{ flex: 9 }} safeAreaTop={5} safeAreaX={5}>
          {children}
        </Box>
      </SafeAreaView>
    </>
  );
};

export default UserLayout;
