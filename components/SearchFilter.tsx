import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { TypeFilter } from './TypeFilter';

type SearchFilterProps = {
    text: string;
    setText: (text: string) => void;
    filter: string;
    setFilter: (text: string) => void;
    setIsFocused?: (isFocused: boolean) => void;
    previousPath: string;
}

export function SearchFilter({text, setText, filter, setFilter, setIsFocused, previousPath}: SearchFilterProps) {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Search for resources..."
                    placeholderTextColor="gray"
                    onFocus={() => setIsFocused && setIsFocused(true)}
                />
                <TouchableOpacity style={styles.filterButton} onPress={() => router.push({
                    pathname: "/filter",
                    params: { from: previousPath }
                })}>
                    <Ionicons name="options" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TypeFilter setFilter={setFilter} filter={filter} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 6,
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems:  "center",
        gap: 6,
        width: "100%",
        height: 40,
    },
    input: {
        height: 40,
        padding: 12,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        color: "#000",
        width: "90%"
    },
    filterButton: {
        flexDirection: "column",
        height: "100%",
        padding: 8,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    }
});