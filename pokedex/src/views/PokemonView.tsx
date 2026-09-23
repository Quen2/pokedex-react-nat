import Header from "../components/Header";
import SearchBar from "@/components/SearchBar";
import PokemonList from "@/components/PokemonList"
import {StyleSheet, View} from "react-native";
import {useState} from "react";

export default function PokemonView() {
    const [searchParam, setSearchParam] = useState("");

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar searchValue={searchParam} onSearch={setSearchParam}/>
            <PokemonList searchValue={searchParam}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DC0A2D",
        padding: 4,
    },
})