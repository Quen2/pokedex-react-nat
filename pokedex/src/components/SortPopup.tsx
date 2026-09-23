import { View, Text, Pressable, StyleSheet } from "react-native";

export type SortOption = "number" | "name";

export default function SortPopup(props: {
    visible: boolean;
    sortBy: SortOption;
    onChange: (value: SortOption) => void;
}) {
    if (!props.visible) return null;

    const options: { value: SortOption; label: string }[] = [
        { value: "number", label: "Number" },
        { value: "name", label: "Name" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sort by:</Text>
            </View>
            <View style={styles.optionsBox}>
                {options.map((option) => (
                    <Pressable
                        key={option.value}
                        style={styles.optionRow}
                        onPress={() => props.onChange(option.value)}
                    >
                        <View style={styles.radioOuter}>
                            {props.sortBy === option.value && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 48,
        right: 0,
        width: 160,
        borderRadius: 16,
        backgroundColor: "#DC0A2D",
        padding: 8,
        zIndex: 100,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    header: {
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    headerText: {
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        fontSize: 14,
    },
    optionsBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 8,
        gap: 4,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#DC0A2D",
        justifyContent: "center",
        alignItems: "center",
    },
    radioInner: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#DC0A2D",
    },
    optionLabel: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#000000",
    },
});