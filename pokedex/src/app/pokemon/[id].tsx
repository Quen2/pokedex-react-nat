import {View, StyleSheet, Text, Image, Pressable} from "react-native"
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { getPokemon } from "@/api/pokemon/getPokemon";
import { PokemonType } from "@/types/PokemonType";
import DetailHeader from "@/components/DetailHeader";
import PokemonDetail from "@/components/PokemonDetail";
import { Link } from 'expo-router';
import Back from "@/assets/Back.svg"

export default function DetailPage () {
    const { id } = useLocalSearchParams();
    const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);

    const color: Record<string, string> = {
        grass: "#74CB48",
        poison: "#A63DE8",
        fire: "#F57D31",
        water: "#6493EB",
        bug: "#A7B723",
        normal: "#AAB09F",
        electric: "#F9CF30",
        ground: "#DA7C4D",
        fairy: "#E69EAC",
        fighting: "#82311A",
        psychic: "#F97176",
        rock: "#B69E31",
        ghost: "#70597C",
        ice: "#9AD6DF",
        dragon: "#7037FF",
        dark: "#75574C",
        steel: "#B7B9D0",
        flying: "#A891EC",
    }

    function capitalizeFirstLetter(name: string | undefined): string {
        // @ts-ignore
        return name?.charAt(0).toUpperCase() + name?.slice(1)
    }

    useEffect(() => {
        async function loadPokemon (id: string | string[]) {
            try {
                const data = await getPokemon(id);
                setPokemonData(data);
            } catch (error) {
                console.error(error);
            }
        }
        loadPokemon(id);
    }, []);

    return (
        pokemonData ?
            <View style={[ styles.container, { backgroundColor: color[pokemonData.types[0].type.name], }, ]}>
                <DetailHeader id={id} pokemonName={capitalizeFirstLetter(pokemonData?.name)}/>
                <View style={styles.align}>
                    {
                        Number(id) !== 1 ?
                        <Link href={{
                            pathname: "/pokemon/[id]",
                            params: { id: (Number(id) - 1) },
                        }}>
                            <Back width={24} height={24}/>
                        </Link> : <View/>
                    }
                    <Image
                        source={{ uri: pokemonData.sprites.other["official-artwork"].front_default }}
                        alt={pokemonData.name}
                        style={styles.pokemonImage}
                        resizeMode="contain"
                    />
                    <Link href={{
                        pathname: "/pokemon/[id]",
                        params: { id: (Number(id) + 1) },
                    }}>
                        <Back width={24} height={24} style={{ transform: [{ rotateY: '180deg' }] }}
                        />
                    </Link>
                </View>
                <PokemonDetail pokemonData={pokemonData} accentColor={color[pokemonData.types[0].type.name]} />
            </View> : <Text>Loading....</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        alignSelf: "center",
        zIndex: 10,
        elevation: 10
    },
    align: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12
    }
})