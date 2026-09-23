import Header from "../components/Header";
import SearchBar from "@/components/SearchBar";
import PokemonList from "@/components/PokemonList"
import {StyleSheet, View} from "react-native";
import {useState} from "react";
import {SortOption} from "@/components/SortPopup";

export default function PokemonView() {
    const [searchParam, setSearchParam] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("number");

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar
                searchValue={searchParam}
                onSearch={setSearchParam}
                isSorting={isSorting}
                setIsSorting={setIsSorting}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <PokemonList searchValue={searchParam} sortBy={sortBy} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DC0A2D",
        padding: 4,
    },
})