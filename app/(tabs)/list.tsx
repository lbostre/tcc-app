import {
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ResourceCard } from "@/components/ResourceCard";
import { useEffect, useState } from "react";
import { firestore } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Filter } from "@/components/Filter";
import { useNavigation, useRouter } from "expo-router";

type Resource = {
    id: string;
    name: string;
    type: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    overview: string;
    services: string;
    openTimes: string[];
};

export default function TabTwoScreen() {
    const [text, onChangeText] = useState("");
    const [filter, setFilter] = useState("");
    const [resources, setResources] = useState<Resource[]>([]);
    const router = useRouter();

    const fetchData = async () => {
        const resourcesRef = collection(firestore, "resources");
        const resourcesSnapshot = await getDocs(resourcesRef);
        setResources(
            resourcesSnapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() } as Resource)
            )
        );
    };

    useEffect(() => {
        fetchData();
        console.log(resources[0]);
    }, []);

    const filteredResources = resources.filter(
        (resource) =>
            resource.name.toLowerCase().includes(text.toLowerCase()) &&
            (resource.type === filter || filter === "")
    );

    return (
        <ThemedView style={styles.container}>
            <View>
                <ThemedText type="title">Resources</ThemedText>
                <ThemedText>
                    List of all resources. Search for a specific resource or use
                    the filters below.
                </ThemedText>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search for resources..."
            />
            <Filter setFilter={setFilter} />
            <ScrollView style={styles.scrollContainer}>
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/resource",
                                    params: {
                                        resource: JSON.stringify(resource),
                                    },
                                })
                            }
                            key={resource.id}
                        >
                            <ResourceCard resource={resource} />
                        </TouchableOpacity>
                    ))
                ) : (
                    <ThemedText>No resources found</ThemedText>
                )}
            </ScrollView>
        </ThemedView>
    );
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
        backgroundColor: "#fff",
        borderRadius: 5,
        color: "#000",
    },
});
