import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../../assets/Poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../assets/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../../assets/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../assets/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../assets/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../../assets/Poppins/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return <Stack
      screenOptions={{
        headerShown: false,
      }}
  />;
}
