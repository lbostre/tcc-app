import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Animated, Platform, useWindowDimensions, TouchableWithoutFeedback } from "react-native";
import { Resource, ResourceMarker } from '@/utils/types';
import { ResourceCard } from '@/components/ResourceCard';
import * as Location from "expo-location";
import { ResourceIcon } from '@/components/ResourceIcon';


type MapProps = {
    resourceMarkers: ResourceMarker[];
    selectedResourceMarker: ResourceMarker | null | undefined;
    setSelectedResourceMarker: (selectedMarkerResource: ResourceMarker | null) => void;
    isFocused: boolean;
}

type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

const mapStyle =
    [
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off",
                },
            ],
        }
    ]

export default function Map({resourceMarkers, selectedResourceMarker, setSelectedResourceMarker, isFocused}: MapProps) {
    const [region, setRegion] = useState(getInitialState());
    const mapRef = useRef<MapView | null>(null); // Reference for MapView
    const onRegionChangeComplete = (newRegion: Region) => {
        setRegion(newRegion); // Keeps track of latitudeDelta and longitudeDelta
    };
    const { width, height } = useWindowDimensions();

    function getInitialState() {
        // Lafayette, IN
        return {
            latitude: 40.4167,
            longitude: -86.8753,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    }

    const animateToRegion = (newRegion: Region) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }, 400);
        }
    };


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.warn("Permission to access location was denied");
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
            });
        })();
    }, []);

    useEffect(() => {
        if (!isFocused && selectedResourceMarker) {
            animateToRegion({
                latitude: selectedResourceMarker.marker.latlng.latitude,
                longitude: selectedResourceMarker.marker.latlng.longitude,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
            });
        }
    }, [selectedResourceMarker, isFocused]);

    const handleMarkerOnPress = (resMarker: ResourceMarker)=> {
        setSelectedResourceMarker(resMarker)
        animateToRegion({ latitude: resMarker.marker.latlng.latitude, longitude: resMarker.marker.latlng.longitude, latitudeDelta: .06, longitudeDelta: .06 })
    }

    const handleMapPress = () => {
        if (selectedResourceMarker) {
            setSelectedResourceMarker(null);
        }
    };

    return (
        <View style={styles.container}>
            
            <MapView
                ref={mapRef}
                initialRegion={region}
                style={styles.map}
                showsUserLocation={true}
                onRegionChangeComplete={onRegionChangeComplete} // Track zoom level
                customMapStyle={mapStyle}
                userInterfaceStyle="light"
            >
                {resourceMarkers.map((resMarker, index) => (
                    <Marker
                        key={index}
                        coordinate={resMarker.marker.latlng}
                        onPress={() => handleMarkerOnPress(resMarker)}
                        style={{paddingTop: Platform.OS === "android" ? 7 : 0, paddingLeft: Platform.OS === "android" ? 6 : 0}}
                    >
                        <Animated.View style={{ transform: [{ scale: selectedResourceMarker?.resource.id === resMarker.resource.id ? width <= 360 ? 1.53 : 1.9 : 1 }] }}>
                            <ResourceIcon type={resMarker.resource.type} outline={true} />
                        </Animated.View>
                    </Marker>
                ))}
            </MapView>
            
            {/* </TouchableWithoutFeedback> */}
            <View style={styles.cardContainer}>
                {selectedResourceMarker && <ResourceCard resource={selectedResourceMarker.resource}/>}
            </View>
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
    cardContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center", // Centers the card horizontally
        width: "100%",
        paddingHorizontal: 8,
    },
});
