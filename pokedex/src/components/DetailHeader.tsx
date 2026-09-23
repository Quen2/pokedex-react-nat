import {StyleSheet, View, Text, Pressable} from "react-native"
import Back from "../../assets/Back.svg"
import Pokeball from "../../assets/Pokeball.svg"
import {Link} from "expo-router";

export default function DetailHeader (props: {
    pokemonName: string,
    id: string | string []
}) {

    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Link href={{
                    pathname: "/"
                }}>
                    <Back width={24} height={24}/>
                </Link>
                <Text style={styles.name}>{props.pokemonName}</Text>
            </View>
            <Text style={styles.name}>#{String(props.id).padStart(3, "0")}</Text>
            <Pokeball style={styles.pokeball} width={200} height={200} color={"EFEFEF"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    nameContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: "center",
    },
    name: {
        fontFamily: "Poppins-Bold",
        fontSize: 24,
        color: "#FFFFFF"
    },
    pokeball: {
        position: "absolute",
        right:0,
        top: 0,
        opacity: 0.4
    }
})