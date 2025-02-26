import {
    Text,
    View,
    StyleSheet,
    Touchable,
    TouchableOpacity, ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type FilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
};

export function TypeFilter({ filter, setFilter }: FilterProps) {
    return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    backgroundColor: filter === "Food Pantry" ? "white" : "green",
                    borderWidth: filter === "Food Pantry" ? 3 : 0,
                    borderColor: "darkgreen",
                }}
                onPress={() => filter === "Food Pantry" ? setFilter("") : setFilter("Food Pantry")}
            >
                <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={16}
                    color={filter === "Food Pantry" ? "green" : "white"}
                />
                <Text style={{ ...styles.filterText, color: filter === "Food Pantry" ? "green" : "white" }}>Food Pantry</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    backgroundColor: filter === "Shelter" ? "white" : "orange",
                    borderWidth: filter === "Shelter" ? 3 : 0,
                    borderColor: "darkorange",
                }}
                onPress={() => filter === "Shelter" ? setFilter("") : setFilter("Shelter")}
            >
                <FontAwesome6 name="house" size={14} color={filter === "Shelter" ? "orange" : "white"} />
                <Text style={{ ...styles.filterText, color: filter === "Shelter" ? "orange" : "white" }}>Shelter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    backgroundColor: filter === "Medical" ? "white" : "red",
                    borderWidth: filter === "Medical" ? 3 : 0,
                    borderColor: "red",
                }}
                onPress={() => filter === "Medical" ? setFilter("") : setFilter("Medical")}
            >
                <FontAwesome5 name="briefcase-medical" size={16} color={filter === "Medical" ? "red" : "white"} />
                <Text style={{ ...styles.filterText, color: filter === "Medical" ? "red" : "white" }}>Shelter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.iconContainer,
                    borderWidth: filter === "Other" ? 3 : 0,
                    backgroundColor: filter === "Other" ? "white" : "gray",
                    borderColor: "darkgray",
                }}
                onPress={() => filter === "Other" ? setFilter("") : setFilter("Other")}
            >
                <Text style={{ ...styles.filterText, color: filter === "Other" ? "gray" : "white" }}>Other</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 10,
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
