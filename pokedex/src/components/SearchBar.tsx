import {StyleSheet, View, TextInput, Pressable} from "react-native";
import Search from "../../assets/Search.svg";
import Sort from "../../assets/Sort.svg";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <View style={styles.searchInput}>
                <Search width={16} height={16} color="#DC0A2D" />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#9C9C9C"
                />
            </View>
            <Pressable style={styles.sortInput}>
                <Sort width={20} height={20} color="#DC0A2D" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingBottom: 32
    },
    searchInput: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingHorizontal: 14,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        color: "#000000",
        padding: 0,
    },
    sortInput: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
    }
})