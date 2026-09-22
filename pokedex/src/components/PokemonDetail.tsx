import {View, Text, StyleSheet, Image} from "react-native";
import { PokemonType } from "@/types/PokemonType";
import { PokemonText } from "@/types/PokemonText"
import Size from "../../assets/Size.svg"
import Poids from "../../assets/Poids.svg"
import {getPokemonDescription} from "@/api/pokemon/getPokemon";
import {useState, useEffect} from "react";

const TYPE_COLORS: Record<string, string> = {
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
};

const STAT_LABELS: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
};

function capitalizeFirstLetter(name: string | undefined): string {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function PokemonDetail(props: { pokemonData: PokemonType; accentColor: string }) {
    const { pokemonData, accentColor } = props;
    const [ pokemonText, setPokemonText ] = useState<PokemonText | null>(null)

    useEffect(() => {
        async function loadPokemonText () {
            try {
                const data = await getPokemonDescription(props.pokemonData.id);
                setPokemonText(data)
            } catch (error) {
                console.error(error);
            }
        }
        loadPokemonText();
    }, []);

    const maxStat = 250;

    return (
        <View style={styles.container}>
            <View style={styles.badgeRow}>
                {pokemonData.types.map((t) => (
                    <View
                        key={t.type.name}
                        style={[styles.badge, { backgroundColor: TYPE_COLORS[t.type.name] ?? "#999" }]}
                    >
                        <Text style={styles.badgeText}>{capitalizeFirstLetter(t.type.name)}</Text>
                    </View>
                ))}
            </View>

            <Text style={[styles.sectionTitle, { color: accentColor }]}>About</Text>

            <View style={styles.infoRow}>
                <View style={styles.infoCol}>
                    <View style={styles.align}>
                        <Poids width={11} height={11}/>
                        <Text style={styles.infoValue}>{pokemonData.weight / 10} kg</Text>
                    </View>
                    <Text style={styles.infoLabel}>Weight</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoCol}>
                    <View style={styles.align}>
                        <Size width={11} height={11}/>
                        <Text style={styles.infoValue}>{pokemonData.height / 10} m</Text>
                    </View>
                    <Text style={styles.infoLabel}>Height</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoCol}>
                    {pokemonData.abilities.slice(0, 2).map((a) => (
                        <Text key={a.ability.name} style={styles.infoValue}>
                            {capitalizeFirstLetter(a.ability.name)}
                        </Text>
                    ))}
                    <Text style={styles.infoLabel}>Moves</Text>
                </View>
            </View>

            <View>
                <Text style={styles.description}>
                    {pokemonText?.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ")}
                </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: accentColor, marginTop: 24 }]}>Base Stats</Text>

            <View style={styles.statsBlock}>
                {pokemonData.stats.map((s) => (
                    <View key={s.stat.name} style={styles.statRow}>
                        <Text style={styles.statLabel}>{STAT_LABELS[s.stat.name] ?? s.stat.name}</Text>
                        <Text style={styles.statValue}>{String(s.base_stat).padStart(3, "0")}</Text>
                        <View style={styles.barBackground}>
                            <View
                                style={[
                                    styles.barFill,
                                    {
                                        width: `${Math.min((s.base_stat / maxStat) * 100, 100)}%`,
                                        backgroundColor: accentColor,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 24,
        justifyContent: "space-around",
        marginHorizontal: 6,
        marginBottom: 6
    },
    badgeRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20,
    },
    badge: {
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
    sectionTitle: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    infoCol: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    infoValue: {
        fontWeight: "600",
        fontSize: 13,
        color: "#222",
    },
    infoLabel: {
        fontSize: 11,
        color: "#999",
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: 36,
        backgroundColor: "#eee",
    },
    statsBlock: {
        gap: 10,
        paddingBottom: 24,
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    statLabel: {
        width: 36,
        fontSize: 12,
        fontWeight: "700",
        color: "#888",
    },
    statValue: {
        width: 32,
        fontSize: 12,
        color: "#444",
    },
    barBackground: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#eee",
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        borderRadius: 3,
    },
    align: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: 10,
        textAlign: "center",
        marginTop: 8
    }
});