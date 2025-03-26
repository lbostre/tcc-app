import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type ResourceIconProps = {
    type: string,
    size?: "sm" | "lg",
    outline? :boolean,
}

export function ResourceIcon({type, size = "sm", outline = false}: ResourceIconProps) {
    if (type === "Food Pantry") {
        return (
            <View
                style={{
                    ...(size === "sm" ? styles.iconContainer : styles.iconContainerLarge),
                    backgroundColor: "#18a773",
                    borderColor: "white",
                    borderWidth: outline ? 2 : 0,
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
                    backgroundColor: "#0597ff",
                    borderColor: "white",
                    borderWidth: outline ? 2 : 0,
                }}
            >
                <FontAwesome6 name="house" size={size === "sm" ?16: 42} color="white" />
            </View>
        );
    } else if(type === "Medical") {
        return (
            <View
                style={{
                    ...(size === "sm" ? styles.iconContainer : styles.iconContainerLarge),
                    backgroundColor: "#ea4335",
                    borderColor: "white",
                    borderWidth: outline ? 2 : 0,
                }}
            >
                <FontAwesome5 name="briefcase-medical" size={size === "sm" ? 16: 42} color="white" />
            </View>
        )
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