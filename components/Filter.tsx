import {
    Text,
    View,
    StyleSheet,
    Touchable,
    TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type FilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
};

export function Filter({ filter, setFilter }: FilterProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    backgroundColor: "green",
                    borderWidth: filter === "Food Pantry" ? 3 : 0,
                    borderColor: "darkgreen",
                }}
                onPress={() => filter === "Food Pantry" ? setFilter("") : setFilter("Food Pantry")}
            >
                <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={16}
                    color="white"
                />
                <Text style={styles.filterText}>Food Pantry</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    backgroundColor: "orange",
                    borderWidth: filter === "Shelter" ? 3 : 0,
                    borderColor: "darkorange",
                }}
                onPress={() => filter === "Shelter" ? setFilter("") : setFilter("Shelter")}
            >
                <FontAwesome6 name="house" size={14} color="white" />
                <Text style={styles.filterText}>Shelter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    borderWidth: filter === "Other" ? 3 : 0,
                    backgroundColor: "gray",
                    borderColor: "darkgray",
                }}
                onPress={() => filter === "Other" ? setFilter("") : setFilter("Other")}
            >
                <Text style={styles.filterText}>Other</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    iconContainer: {
        flexDirection: "row",
        borderRadius: 30,
        padding: 4,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        gap: 4,
    },
    filterText: {
        fontSize: 16,
        color: "white",
    },
});
