import {
    StyleSheet,
    View,
    ScrollView, ActivityIndicator,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ResourceCard } from "@/components/ResourceCard";
import { useEffect, useState } from "react";
import { SearchFilter } from '@/components/SearchFilter';
import { Resource } from '@/utils/types';
import { useLocalSearchParams } from 'expo-router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {firestore} from "@/firebaseConfig";
import { isOpen } from '@/utils/times';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabTwoScreen() {
    const {day, time}: {day: string, time: string} = useLocalSearchParams();
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("");
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const resourcesRef = collection(firestore, "resources");

        const q = filter ? query(resourcesRef, where("type", "==", filter)) : resourcesRef;

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setResources(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Resource)));
            setLoading(false);
        }, (error) => {
            console.error("Error fetching resources:", error);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        setLoading(false)
        return () => unsubscribe();
    }, [filter]);

    const filteredResources = resources.filter((resource) => {
        const date = new Date(time);
        const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        return (
            resource.name.toLowerCase().includes(text.toLowerCase()) &&
            (resource.type === filter || filter === "") &&
            (!day || !time || isOpen(formattedTime, day, resource.openTimes))
        );
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <View>
                <ThemedText type="title">Resources</ThemedText>
                <ThemedText>
                    List of all resources. Search for a specific resource or use
                    the filters below.
                </ThemedText>
            </View>
            <SearchFilter text={text} setText={setText} setFilter={setFilter} filter={filter} previousPath={"/list"}/>
            <ScrollView style={styles.scrollContainer}>
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                            <ResourceCard resource={resource} key={resource.id} showMapButton={true}/>
                    ))
                ) : (
                    <View style={styles.noResourcesFoundContainer}>
                        <Entypo name="magnifying-glass" size={40} color="black" />
                        <ThemedText type="defaultSemiBold">No resources found</ThemedText>
                    </View>
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
        paddingTop: 56,
        gap: 14,
        overflow: "hidden",
        paddingBottom: 90
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
    noResourcesFoundContainer: {
        flex: 1,
        justifyContent: "center",
        gap: 10,
        alignItems: "center",
        paddingTop: 48,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
    }
});
