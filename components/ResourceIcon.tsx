import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type ResourceIconProps = {
    type: string,
    size?: "sm" | "lg"
}

export function ResourceIcon({type, size = "sm"}: ResourceIconProps) {
    if (type === "Food Pantry") {
        return (
            <View
                style={{
                    ...(size === "sm" ? styles.iconContainer : styles.iconContainerLarge),
                    backgroundColor: "green",
                }}
            >
                <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={size === "sm" ?16: 44}
                    color="white"
                />
            </View>
        );
    } else if (type === "Shelter") {
        return (
            <View
                style={{
                    ...(size === "sm" ? styles.iconContainer : styles.iconContainerLarge),
                    backgroundColor: "orange",
                }}
            >
                <FontAwesome6 name="house" size={size === "sm" ?16: 42} color="white" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 50,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    iconContainerLarge: {
        borderRadius: 100,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
});