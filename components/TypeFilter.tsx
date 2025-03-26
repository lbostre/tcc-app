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
import Feather from '@expo/vector-icons/Feather';

type FilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
};

export function TypeFilter({ filter, setFilter }: FilterProps) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor: filter === "" ? "#ffaf75" : "white",
                        borderWidth: 3,
                        borderColor: "#ff8126",
                    }}
                    onPress={() => filter === "" ? setFilter("") : setFilter("")}
                >
                    <Text style={{ ...styles.filterText, color: filter === "" ? "black" : "black" }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor: filter === "Food Pantry" ? "#1fd693" : "white",
                        borderWidth: 3,
                        borderColor: "#18a773",
                    }}
                    onPress={() => filter === "Food Pantry" ? setFilter("") : setFilter("Food Pantry")}
                >
                    <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={16}
                        color={filter === "Food Pantry" ? "white" : "#18a773"}
                    />
                    <Text style={{ ...styles.filterText, color: filter === "Food Pantry" ? "black" : "black" }}>Food Pantry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor: filter === "Shelter" ? "#3daeff" : "white",
                        borderWidth: 3,
                        borderColor: "#0597ff",
                    }}
                    onPress={() => filter === "Shelter" ? setFilter("") : setFilter("Shelter")}
                >
                    <FontAwesome6 name="house" size={14} color={filter === "Shelter" ? "white" : "#0597ff"} />
                    <Text style={{ ...styles.filterText, color: filter === "Shelter" ? "black" : "black" }}>Shelter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor: filter === "Medical" ? "#ef6e62" : "white",
                        borderWidth: 3,
                        borderColor: "#ea4335",
                    }}
                    onPress={() => filter === "Medical" ? setFilter("") : setFilter("Medical")}
                >
                    <FontAwesome5 name="briefcase-medical" size={16} color={filter === "Medical" ? "white" : "#ea4335"} />
                    <Text style={{ ...styles.filterText, color: filter === "Medical" ? "black" : "black" }}>Medical</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        borderWidth: 3,
                        backgroundColor: filter === "Other" ? "lightgray" : "white",
                        borderColor: "darkgray",
                    }}
                    onPress={() => filter === "Other" ? setFilter("") : setFilter("Other")}
                >
                    <Text style={{ ...styles.filterText, color: filter === "Other" ? "black" : "black" }}>Other</Text>
                </TouchableOpacity>
                {/* <Feather name="arrow-right-circle" size={24} color="black" style={styles.arrowIcon}/> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
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
        fontSize: 18,
        color: "white",
    },
    arrowIcon: {
        position: "absolute",
        top: "50%", // Vertically center the arrow
        right: 130, // Place it on the right side of the container
        transform: [{ translateY: -12 }],
    }
});
