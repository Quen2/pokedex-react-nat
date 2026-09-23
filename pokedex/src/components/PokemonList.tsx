import {View, StyleSheet, FlatList} from "react-native";
import {useState, useEffect, useMemo} from "react";
import { getPokemons } from "@/api/pokemon/getPokemon";
import PokemonCard from "@/components/PokemonCard";
import { PokemonListType } from "@/types/PokemonListType";
import { Link } from "expo-router";
import {SortOption} from "@/components/SortPopup";

export default function PokemonList(props: {
    searchValue: string;
    sortBy: SortOption;
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
        let list = props.searchValue.trim() === ""
            ? pokemonList
            : allPokemonsList.filter(p =>
                p.name.toLowerCase().includes(props.searchValue.trim().toLowerCase())
            );

        if (props.sortBy === "name") {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            list = [...list].sort((a, b) => Number(getIdFromUrl(a.url)) - Number(getIdFromUrl(b.url)));
        }

        return list;
    }, [props.searchValue, pokemonList, allPokemonsList, props.sortBy]);

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