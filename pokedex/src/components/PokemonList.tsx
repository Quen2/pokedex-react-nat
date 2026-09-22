import {View, StyleSheet, FlatList} from "react-native";
import {useState, useEffect} from "react";
import { getPokemons } from "@/api/pokemon/getPokemon";
import PokemonCard from "@/components/PokemonCard";
import { PokemonListType } from "@/types/PokemonListType";
import { Link } from "expo-router";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonListType[]>([]);
    const [offset, setOffset] = useState(0)
    const limit: number = 20

    const getIdFromUrl = (url: string) => {
        const parts = url.split('/').filter(Boolean);
        return parts[parts.length - 1];
    };

    const updatePagination = () => {
        setOffset(prev => prev + limit)
    }

    useEffect(() => {
         async function loadPokemons () {
            try {
                const data = await getPokemons(offset, limit);
                setPokemonList(prev => [...prev, ...data.results]);
            } catch (error) {
                console.error(error);
            }
        }
        loadPokemons();
    }, [offset, limit]);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.pokemonContainer}
                onEndReached={updatePagination}
                onEndReachedThreshold={0.5}
                data={pokemonList}
                keyExtractor={(item) => getIdFromUrl(item.url)}
                renderItem={({ item }) => (
                    <Link href={{
                        pathname: "/pokemon/[id]",
                        params: { id: getIdFromUrl(item.url) },
                    }}>
                        <PokemonCard pokemonList={item} id={getIdFromUrl(item.url)}/>
                    </Link>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        paddingBottom: 6,
        paddingTop: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 8
    },
    pokemonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        gap: 6,
        alignItems: "center",
    }
})