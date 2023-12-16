import { SafeAreaView } from "react-native";
import { Text, Box } from "native-base";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Box py={12} px={5} pb={4} bg={"r.100"}>
          <Text color={"#ffff"} fontWeight={900} fontSize={24}>
            Panel Administrativo
          </Text>
        </Box>
        <Box style={{ flex: 9 }} safeAreaTop={5} safeAreaX={5}>
          {children}
        </Box>
        <Footer style={{ width: "100%" }} />
      </SafeAreaView>
    </>
  );
};

export default AdminLayout;
