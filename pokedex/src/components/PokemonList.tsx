import {View, StyleSheet, FlatList} from "react-native";
import {useState, useEffect, useMemo} from "react";
import { getPokemons } from "@/api/pokemon/getPokemon";
import PokemonCard from "@/components/PokemonCard";
import { PokemonListType } from "@/types/PokemonListType";
import { Link } from "expo-router";

export default function PokemonList(props: {
    searchValue: string
}) {
    const [pokemonList, setPokemonList] = useState<PokemonListType[]>([]);
    const [allPokemonsList, setAllPokemonsList] = useState<PokemonListType[]>([]);
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

    useEffect(() => {
        async function loadAllPokemons () {
            try {
                const data = await getPokemons(0, 2000)
                setAllPokemonsList(data.results);
            } catch (error) {
                console.log(error)
            }
        }
        loadAllPokemons();
    }, []);

    const displayedList = useMemo(() => {
        if (props.searchValue.trim() === "") {
            return pokemonList;
        }
        return allPokemonsList.filter(p =>
            p.name.toLowerCase().includes(props.searchValue.trim().toLowerCase())
        );
    }, [props.searchValue, pokemonList]);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.pokemonContainer}
                columnWrapperStyle={styles.row}
                onEndReached={updatePagination}
                onEndReachedThreshold={0.5}
                data={displayedList}
                numColumns={3}
                keyExtractor={(item) => "_" + getIdFromUrl(item.url)}
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
        gap: 6,
    },
    row: {
        justifyContent: "space-around",
        gap: 6,
    }
})