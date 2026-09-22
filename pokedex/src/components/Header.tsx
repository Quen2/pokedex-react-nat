import {View, StyleSheet, Text} from "react-native";
import Pokeball from "../../assets/Pokeball.svg";

export default function Header() {
    return (
        <View style={styles.container}>
            <Pokeball width={24} height={24} />
            <Text style={styles.title}>Pokedex</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        paddingHorizontal: 12,
        paddingBottom: 24,
        paddingTop: 12,
        gap: 12
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Poppins-Bold",
        color: "#FFFFFF",
    }
})