import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Filter } from '@/components/Filter';

type SearchFilterProps = {
    text: string;
    setText: (text: string) => void;
    setFilter: (text: string) => void;
    setIsFocused?: (isFocused: boolean) => void;
}

export function SearchFilter({text, setText, setFilter, setIsFocused}: SearchFilterProps) {
    const colorScheme = useColorScheme();
    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Search for resources..."
                placeholderTextColor="gray"
                onFocus={() => setIsFocused && setIsFocused(true)}
            />
            <Filter setFilter={setFilter} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: 32,
        paddingVertical: 56,
        gap: 14,
        overflow: "hidden",
    },
    scrollContainer: {
        paddingBottom: 48,
    },
    input: {
        height: 40,
        padding: 12,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        color: "#000",
    },
});