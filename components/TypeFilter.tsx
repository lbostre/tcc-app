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
                        backgroundColor: filter === "" ? "white" : "darkblue",
                        borderWidth: filter === "" ? 3 : 0,
                        borderColor: "darkblue",
                    }}
                    onPress={() => filter === "" ? setFilter("") : setFilter("")}
                >
                    <Text style={{ ...styles.filterText, color: filter === "" ? "darkblue" : "white" }}>All</Text>
                </TouchableOpacity>
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
                    <Text style={{ ...styles.filterText, color: filter === "Medical" ? "red" : "white" }}>Medical</Text>
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
