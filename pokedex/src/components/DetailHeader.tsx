import {StyleSheet, View, Text, Pressable} from "react-native"
import Back from "../../assets/Back.svg"
import Pokeball from "../../assets/Pokeball.svg"

export default function DetailHeader (props: {
    pokemonName: string,
    id: string | string []
}) {

    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Pressable>
                    <Back width={20} height={20}/>
                </Pressable>
                <Text style={styles.name}>{props.pokemonName}</Text>
            </View>
            <Text style={styles.name}>{props.id}</Text>
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