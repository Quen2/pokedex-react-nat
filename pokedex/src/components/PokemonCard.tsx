import { View, Text, StyleSheet, Image } from "react-native"
import { PokemonListType } from "@/types/PokemonListType"
import { PokemonType } from "@/types/PokemonType"
import { useEffect, useState } from "react"
import {getPokemon} from "@/api/pokemon/getPokemon";

export default function PokemonCard(props: {
    pokemonList: PokemonListType;
    id: string;
}) {
    const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);

    function capitalizeFirstLetter(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    useEffect(() => {
        async function loadPokemon (id: string) {
            try {
                const data = await getPokemon(id);
                setPokemonData(data);
            } catch (error) {
                console.error(error);
            }
        }
        loadPokemon(props.id);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>#{String(props.id).padStart(3, "0")}</Text>
            <Image
                source={{ uri: pokemonData?.sprites.other["official-artwork"].front_default }}
                alt={props.pokemonList?.name}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
            />
            <Text>{capitalizeFirstLetter(props.pokemonList.name)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 2px #666666",
        borderRadius: 8
    },
    id: {
        alignSelf: "flex-end",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        color: "#666666"
    },
    name: {
        fontFamily: "Poppins-Regular",
        fontSize: 8,
        color: "#666666",
        textAlign: "right",
        width: "100%",
        paddingRight: 6
    }
})