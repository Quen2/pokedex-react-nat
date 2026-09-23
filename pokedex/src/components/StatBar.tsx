import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from "react-native-reanimated";

export default function StatBar(props: {
    value: number;
    maxStat: number;
    color: string;
    delay?: number;
}) {
    const { value, maxStat, color, delay = 0 } = props;
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withDelay(
            delay,
            withTiming(Math.min(value / maxStat, 1), {
                duration: 800,
                easing: Easing.out(Easing.cubic),
            })
        );
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
    }));

    return (
        <View style={styles.barBackground}>
            <Animated.View
                style={[styles.barFill, { backgroundColor: color }, animatedStyle]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});