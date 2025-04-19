import { Stack, useLocalSearchParams } from "expo-router";
import {
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { ResourceIcon } from '@/components/ResourceIcon';
import dayjs from "dayjs"
import { Resource } from '@/utils/types';

export default function ResourceScreen({navigation}: any) {
    const { resource } = useLocalSearchParams();
    const parsedResource = JSON.parse(
        Array.isArray(resource) ? resource[0] : resource
    ) as Resource;

    const {
        name,
        type,
        address,
        email,
        phone,
        website,
        overview,
        services,
        openTimes,
    } = parsedResource;

    const daysOfWeek  = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    function openDefaultMapsApp(address: string) {
        const encodedAddress = encodeURIComponent(address);
        let url = "";
        if (Platform.OS === "ios") {
            url = `maps://?daddr=${encodedAddress}&dirflg=r`;
        } else {
            url = `geo:0,0?q=${encodedAddress}&mode=transit`;
        }
        Linking.openURL(url).catch(() => {
            const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=transit`;
            Linking.openURL(webUrl);
        });
    }

    function callPhoneNumber(phoneNumber: string) {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) =>
            console.error("Error opening dialer:", err)
        );
    }

    function openWebsite(url: string) {
        Linking.openURL("https://" + url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    }

    function sendEmail(email: string) {
        Linking.openURL(`mailto:${email}`).catch((err) =>
            console.error("Failed to open email app:", err)
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: type }} />
            <ScrollView>
                <ThemedView style={styles.container}>
                    <ResourceIcon type={type} size="lg"/>
                    <ThemedText type="title" style={{ textAlign: "center" }}>
                        {name}
                    </ThemedText>
                    <View style={styles.subContainer}>
                        <ThemedText type="subtitle">Contacts</ThemedText>
                        {address && (
                            <InfoRow
                                content={address}
                                subContent={"Get bus directions"}
                                icon={
                                    <MaterialIcons
                                        name="directions-bus"
                                        size={24}
                                        color="white"
                                    />
                                }
                                onPress={() => openDefaultMapsApp(address)}
                            />
                        )}
                        {phone && (
                            <InfoRow
                                content={phone.replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    "$1-$2-$3"
                                )}
                                subContent={"Call"}
                                icon={
                                    <Entypo
                                        name="phone"
                                        size={22}
                                        color="white"
                                    />
                                }
                                onPress={() => callPhoneNumber(phone)}
                            />
                        )}
                        {website && (
                            <InfoRow
                                content={website}
                                subContent={"Website"}
                                icon={
                                    <MaterialIcons
                                        name="computer"
                                        size={24}
                                        color="white"
                                    />
                                }
                                onPress={() => openWebsite(website)}
                            />
                        )}
                        {email && (
                            <InfoRow
                                content={email}
                                subContent={"Email"}
                                icon={
                                    <MaterialIcons
                                        name="email"
                                        size={24}
                                        color="white"
                                    />
                                }
                                onPress={() => sendEmail(email)}
                            />
                        )}
                    </View>
                    <View style={styles.subContainer}>
                        <ThemedText type="subtitle">
                            Operating Days/Hours
                        </ThemedText>
                        {daysOfWeek.map((day) => {
                            // @ts-ignore
                            const timeRanges = openTimes[day];
                            return (
                                timeRanges.length > 0 && (
                                    <HoursRow
                                        key={day}
                                        day={day}
                                        hours={timeRanges}
                                    />
                                )
                            );
                        })}
                    </View>
                    <View style={styles.subContainer}>
                        <ThemedText type="subtitle">About</ThemedText>
                        <AboutRow title="Overview" content={overview} />
                        <AboutRow title="Services" content={services} />
                    </View>
                </ThemedView>
            </ScrollView>
        </>
    );
}

type InfoRowProps = {
    icon: JSX.Element;
    content: string;
    subContent: string;
    onPress: () => void;
};

function InfoRow({ icon, content, subContent, onPress }: InfoRowProps) {
    return (
        <TouchableOpacity style={styles.infoRowContainer} onPress={onPress}>
            <View style={styles.infoRowIconContainer}>{icon}</View>
            <View style={styles.contentContainer}>
                <Text style={styles.subContentText}>{subContent}</Text>
                <Text style={styles.contentText}>{content}</Text>
            </View>
        </TouchableOpacity>
    );
}

type HoursRowProps = {
    day: string;
    hours: string[];
};

function HoursRow({ day, hours }: HoursRowProps) {

    const formatTime = (timeString: string): string => {
        return dayjs(timeString).format("h:mm A");
    };

    const timeRanges = [];
    for (let i = 0; i < hours.length; i += 2) {
        const open = formatTime(hours[i]);
        const close = formatTime(hours[i + 1]);
        timeRanges.push({ open, close });
    }

    const formattedHours = hours
        .map((time) => {
            return dayjs(time).format("h:mm A")
        })
        .join(" - ");

    return (
        <View style={styles.hoursRowContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <View style={styles.timeRangeContainer}>
                {timeRanges.map((range, index) => (
                    <Text style={styles.hoursText} key={index}>
                        {range.open} - {range.close}
                    </Text>
                ))}
            </View>
        </View>
    );
}

type AboutRowProps = {
    title: string;
    content: string;
};

function AboutRow({ title, content }: AboutRowProps) {
    return (
        <View style={styles.aboutRowContainer}>
            <Text style={styles.hoursText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        flexDirection: "column",
        gap: 10,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    iconContainer: {
        borderRadius: 100,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    subContainer: {
        flexDirection: "column",
        gap: 10,
        width: "100%",
        padding: 10,
    },
    infoRowContainer: {
        flexDirection: "row",
        backgroundColor: "#f7f7f7",
        width: "100%",
        padding: 14,
        borderRadius: 5,
        alignItems: "center",
        
        // iOS shadow properties
        shadowColor: "#000", // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Shadow's direction
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Radius of the shadow

        // Android shadow properties
        elevation: 6, // Elevation for Android (controls the shadow's size)
    },
    infoRowIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        marginRight: 12,
        backgroundColor: "#016c9d",
        height: 45,
        borderRadius: 45,
    },
    contentContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    contentText: {
        fontSize: 16,
        color: "black",
        flexWrap: "wrap",
    },
    subContentText: {
        fontSize: 14,
        color: "gray",
    },
    hoursRowContainer: {
        flexDirection: "row",
        backgroundColor: "#f7f7f7",
        width: "100%",
        padding: 14,
        borderRadius: 5,
        alignItems: "center",
        gap: 16,
    },
    timeRangeContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
    },
    dayText: {
        fontSize: 16,
        color: "black",
        width: "30%",
    },
    hoursText: {
        fontSize: 16,
        color: "black",
        fontWeight: "600",
    },
    aboutRowContainer: {
        padding: 14,
        flexDirection: "column",
        backgroundColor: "#f7f7f7",
        width: "100%",
        borderRadius: 5,
        gap: 2,
    },
});
