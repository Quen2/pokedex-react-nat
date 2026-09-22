import {StyleSheet, View} from "react-native";
import PokemonView from "../views/PokemonView";

export default function Index() {
  return (
      <View style={styles.container}>
        <PokemonView />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DC0A2D",
    }
})
