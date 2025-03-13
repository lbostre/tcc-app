import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { OpenClosedText } from "./OpenClosedText";
import { useRouter } from 'expo-router';
import { ResourceIcon } from '@/components/ResourceIcon';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';

type ResourceCardProps = {
    resource: {
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
    showMapButton?: boolean;
};

export function ResourceCard({ resource, showMapButton = false }: ResourceCardProps) {
    const { name, type, openTimes } = resource;
    const router = useRouter();

    const limitTitleLength = (title: string) => {
        if(title.length > 25) {
            return title.substring(0, 25) + "..."
        }
        return title
    }

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/resource",
                    params: {
                        resource: JSON.stringify(resource),
                    },
                })
            }
            style={styles.touchableOpacity}
        >
        <View style={styles.container}>
            <View><ResourceIcon type={type}/></View>
            <View style={styles.containerMiddle}>
                <ThemedText darkColor="#000" type="subtitle">
                    {limitTitleLength(name)}
                </ThemedText>
                <Text style={styles.subheadingText}>{type}</Text>
                <OpenClosedText hours={openTimes} />
            </View>
            <View style={{ ...styles.containerRight, height: showMapButton ? "100%" : "auto" }}>
                {showMapButton && <TouchableOpacity style={styles.mapIconContainer} onPress={() => router.push({
                    pathname: "/(tabs)",
                    params: {
                        name: resource.name,
                    },
                })}>
                    <IconSymbol size={22} name="map.fill" color="black"/>
                </TouchableOpacity>}
                <Entypo name="chevron-right" size={32} color="black" />
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchableOpacity: {
        width: "100%",
        maxHeight: 140,
    },
    container: {
        flexDirection: "row",
        padding: 14,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        gap: 8,
    },
    containerMiddle: {
        flexDirection: "column",
        gap: 1,
        maxWidth: "70%",
    },
    containerRight: {
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        marginLeft: "auto",
        justifyContent: "space-between",
        height: "100%",
    },
    iconContainer: {
        borderRadius: 50,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    subheadingText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 6,
    },
    mapIconContainer: {
        backgroundColor: "lightgray",
        padding: 5,
        borderRadius: 5,

        // iOS shadow properties
        shadowColor: "#000", // Color of the shadow
        shadowOffset: { width: 0, height: 1 }, // Shadow's direction
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 3, // Radius of the shadow

        // Android shadow properties
        elevation: 3, // Elevation for Android (controls the shadow's size)
    }
});
