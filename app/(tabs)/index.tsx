import {
    ActivityIndicator,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Map from "../../components/Map";
import { SearchFilter } from "@/components/SearchFilter";
import { useEffect, useState } from "react";
import { Resource, ResourceMarker } from "@/utils/types";
import { getCoordinates } from "@/utils/geolocation";
import { SearchResult } from "@/components/SearchResult";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import { firestore } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen() {
    const { name } = useLocalSearchParams();
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("");
    const [resourceMarkers, setResourceMarkers] = useState<ResourceMarker[]>(
        []
    );
    const [selectedResourceMarker, setSelectedResourceMarker] =
        useState<ResourceMarker | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const resourcesRef = collection(firestore, "resources");
            const resourcesSnapshot = await getDocs(resourcesRef);

            const fetchedResources: Resource[] = resourcesSnapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() } as Resource)
            );
            const markerPromises = fetchedResources.map(async (resource) => {
                try {
                    const formattedAddress = resource.address.includes(",")
                        ? resource.address
                        : `${resource.address}, USA`;

                    const coords = await getCoordinates(formattedAddress);
                    if (coords) {
                        return {
                            resource,
                            marker: {
                                latlng: coords,
                                title: resource.name,
                                type: resource.type,
                            },
                        };
                    }
                } catch (error) {
                    console.warn(`Geocoding failed for: ${resource.address}`);
                }
                return null;
            });

            const resolvedResourceMarkers = (
                await Promise.all(markerPromises)
            ).filter(Boolean) as ResourceMarker[];
            setResourceMarkers(resolvedResourceMarkers);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchData();
        if (name) {
            const marker = resourceMarkers.find(
                (marker) => marker.resource.name === name
            );
            if (marker) {
                setSelectedResourceMarker(marker);
            }
        }
    }, [name]);

    const filteredResourceMarkers = resourceMarkers.filter(
        (resourceMarker) =>
            resourceMarker.resource.name
                .toLowerCase()
                .includes(text.toLowerCase()) &&
            (resourceMarker.resource.type === filter || filter === "")
    );

    const filteredMapResourceMarkers = resourceMarkers.filter(
        (resourceMarker) =>
            (resourceMarker.resource.type === filter || filter === "")
    );

    return (
        <ThemedView style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <ThemedText type="title">Map</ThemedText>
                    {isFocused && (
                        <TouchableOpacity
                            onPress={() => {
                                setIsFocused(false);
                                Keyboard.dismiss();
                            }}
                        >
                            <AntDesign
                                name="closecircleo"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <SearchFilter
                    text={text}
                    setText={setText}
                    setFilter={setFilter}
                    setIsFocused={setIsFocused}
                    filter={filter}
                    previousPath={"/"}
                    showTimeFilter={false}
                />
            </View>
            {isFocused ? (
                <ScrollView style={styles.resultsContainer}>
                    {filteredResourceMarkers.length > 0 ? (
                        filteredResourceMarkers.map((res) => {
                            return (
                                <SearchResult
                                    key={res.resource.name}
                                    text={res.resource.name}
                                    type={res.resource.type}
                                    onPress={() => {
                                        setSelectedResourceMarker(res);
                                        setTimeout(() => {
                                            setIsFocused(false);
                                        }, 300);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <ThemedText>No resources found</ThemedText>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.mapContainer}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large"/>
                        </View>
                    ) : (
                        <Map
                            resourceMarkers={filteredMapResourceMarkers}
                            selectedResourceMarker={selectedResourceMarker}
                            setSelectedResourceMarker={
                                setSelectedResourceMarker
                            }
                            isFocused={isFocused}
                        />
                    )}
                </View>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        paddingVertical: 56,
        overflow: "hidden",
    },
    topContainer: {
        flexDirection: "column",
        paddingHorizontal: 32,
        paddingTop: 32,
        gap: 14,
        paddingBottom: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    resultsContainer: {
        paddingHorizontal: 32,
        flexDirection: "column",
        gap: 8,
    },
    titleContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    mapContainer: {
        width: "100%",
        height: "75%",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
    }
});

//     <HelloWave />
// </ThemedView>
// <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//     <ThemedText>
//         Edit{" "}
//         <ThemedText type="defaultSemiBold">
//             app/(tabs)/index.tsx
//         </ThemedText>{" "}
//         to see changes. Press{" "}
//         <ThemedText type="defaultSemiBold">
//             {Platform.select({
//                 ios: "cmd + d",
//                 android: "cmd + m",
//                 web: "F12",
//             })}
//         </ThemedText>{" "}
//         to open developer tools.
//     </ThemedText>
// </ThemedView>
// <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//     <ThemedText>
//         Tap the Explore tab to learn more about what's included in
//         this starter app.
//     </ThemedText>
// </ThemedView>
// <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">
//         Step 3: Get a fresh start
//     </ThemedText>
//     <ThemedText>
//         When you're ready, run{" "}
//         <ThemedText type="defaultSemiBold">
//             npm run reset-project
//         </ThemedText>{" "}
//         to get a fresh{" "}
//         <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//         directory. This will move the current{" "}
//         <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//     </ThemedText>
