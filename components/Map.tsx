import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { firestore, collection, getDocs } from "../firebaseConfig";

export default function Map() {
    const [region, setRegion] = useState(getInitialState());
    const [markers, setMarkers] = useState([
        {
            latlng: { latitude: 40.4181, longitude: -86.8898 },
            title: "Purdue University",
            description: "A major university in Lafayette, IN.",
        },
        {
            latlng: { latitude: 40.4112, longitude: -86.8645 },
            title: "Columbian Park Zoo",
            description: "A small, family-friendly zoo in Lafayette.",
        },
        {
            latlng: { latitude: 40.419, longitude: -86.8765 },
            title: "Downtown Lafayette",
            description: "The heart of Lafayette with restaurants and shops.",
        },
        {
            latlng: { latitude: 40.4301, longitude: -86.9147 },
            title: "Celery Bog Nature Area",
            description: "A scenic nature preserve with trails and wetlands.",
        },
    ]);

    function getInitialState() {
        // Lafeyette, IN
        return {
            latitude: 40.4167,
            longitude: -86.8753,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={getInitialState()}
                style={styles.map}
                onRegionChange={(region) => setRegion(region)}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        // image={require("../assets/images/house.png")}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
