import {StyleSheet, View, TextInput, Pressable} from "react-native";
import Search from "../../assets/Search.svg";
import Sort from "../../assets/Sort.svg";
import {useState} from "react";

import SortPopup, { SortOption } from "@/components/SortPopup";

export default function SearchBar(props: {
    searchValue: string;
    onSearch: (value: string) => void;
    isSorting: boolean;
    setIsSorting: (value: boolean) => void;
    sortBy: SortOption;
    setSortBy: (value: SortOption) => void;
}) {
    return (
        <View style={styles.container}>
            <View style={styles.searchInput}>
                <Search width={16} height={16} color="#DC0A2D" />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#9C9C9C"
                    onChangeText={(text: string) => { props.onSearch(text) }}
                    value={props.searchValue}
                />
            </View>
            <View style={{ position: "relative" }}>
                <Pressable
                    style={styles.sortInput}
                    onPress={() => props.setIsSorting(!props.isSorting)}
                >
                    <Sort width={20} height={20} color="#DC0A2D" />
                </Pressable>
                <SortPopup
                    visible={props.isSorting}
                    sortBy={props.sortBy}
                    onChange={(value) => {
                        props.setSortBy(value);
                        props.setIsSorting(false);
                    }}
                />
            </View>
        </View>
    );
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