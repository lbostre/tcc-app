import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ResourceIcon } from '@/components/ResourceIcon';

type SearchResultProps = {text: string, type: string, onPress: () => void};

export function SearchResult({text, type, onPress}: SearchResultProps) {

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={styles.container}>
                <ResourceIcon type={type}/>
                <ThemedText>{text}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical:  4,
        marginBottom: 6,
    },
    iconContainer: {
        borderRadius: 50,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
})