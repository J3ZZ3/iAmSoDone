import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, ImageBackground } from "react-native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: "left",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#306A68",
            height: 50,
          },
          drawerStyle: {
            backgroundColor: "#000000",
            width: 200,
          },
          drawerActiveBackgroundColor: "#FF3131",
          drawerInactiveBackgroundColor: "#000000",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "#BDBDBD",
        }}
      >
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: "Login",
            drawerIcon: () => <Image style={{ width: 20, height: 20 }} source={require("../assets/images/login.png")} />,
            title: "Sign In",
          }}
        />
        <Drawer.Screen
          name="Counter"
          options={{
            drawerLabel: "Counter",
            drawerIcon: () => <Image style={{ width: 20, height: 20 }} source={require("../assets/images/counter.png")} />,
            title: "Counter",
          }}
        />

        <Drawer.Screen
          name="Recorder"
          options={{
            drawerLabel: "Recorder",
            drawerIcon: () => <Image style={{ width: 20, height: 20 }} source={require("../assets/images/recorder.png")} />,
            title: "Audio journal",
          }}
        />
        <Drawer.Screen
          name="Registration"
          options={{
            drawerLabel: "Registration",
            drawerIcon: () => <Image style={{ width: 20, height: 20 }} source={require("../assets/images/registration.png")} />,
            title: "Register",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
