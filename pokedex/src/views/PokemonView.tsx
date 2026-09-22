import Header from "../components/Header";
import SearchBar from "@/components/SearchBar";
import PokemonList from "@/components/PokemonList"
import {StyleSheet, View} from "react-native";

export default function PokemonView() {
    return (
        <View style={styles.container}>
            <Header />
            <SearchBar />
            <PokemonList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DC0A2D",
        padding: 4,
    },
})