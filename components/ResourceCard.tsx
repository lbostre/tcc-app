import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { OpenClosedText } from "./OpenClosedText";
import { useRouter } from 'expo-router';
import { ResourceIcon } from '@/components/ResourceIcon';

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
};

export function ResourceCard({ resource }: ResourceCardProps) {
    const { name, type, openTimes } = resource;
    const router = useRouter();

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
                    {name}
                </ThemedText>
                <Text style={styles.subheadingText}>{type}</Text>
                <OpenClosedText hours={openTimes} />
            </View>
            <View style={styles.containerRight}>
                <Entypo name="chevron-right" size={32} color="black" />
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchableOpacity: {
        width: "100%",
    },
    container: {
        flexDirection: "row",
        padding: 14,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        gap: 8,
        marginBottom: 8,
    },
    containerMiddle: {
        flexDirection: "column",
        gap: 1,
        maxWidth: "70%",
    },
    containerRight: {
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        alignSelf: "center",
        marginLeft: "auto",
    },
    iconContainer: {
        borderRadius: 50,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    subheadingText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
});
