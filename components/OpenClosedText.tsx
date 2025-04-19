import { StyleSheet, Text, View } from "react-native";
import dayjs from 'dayjs';
import { Day, OpenTimes } from "@/utils/types";

type OpenClosedTextProps = {
    hours: OpenTimes;
};

export function OpenClosedText({ hours }: OpenClosedTextProps) {
    function getStatus(openTimes: OpenTimes) {
        const now = dayjs();  // Use dayjs to get the current date and time
        const dayIndex = (now.day() + 6) % 7; // Convert Sunday-based index to Monday-based
        const dayNames: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const today = dayNames[dayIndex];
        const todayHours = openTimes[today];

        if (!todayHours || todayHours.length === 0 || todayHours[0] === "Closed") {
            return { status: "closedToday" };
        }

        const nowMinutes = now.hour() * 60 + now.minute(); // current time

        for (let i = 0; i < todayHours.length; i += 2) {
            const [openTime, closeTime] = [todayHours[i], todayHours[i + 1]];

            const openTimeParsed = dayjs(openTime);
            const closeTimeParsed = dayjs(closeTime);

            const openTimeInMinutes = openTimeParsed.hour() * 60 + openTimeParsed.minute();
            const closeTimeInMinutes = closeTimeParsed.hour() * 60 + closeTimeParsed.minute();

            if (nowMinutes >= openTimeInMinutes && nowMinutes <= closeTimeInMinutes) {
                return { status: "openNow", hours: `${openTimeParsed.format("h:mm A")} - ${closeTimeParsed.format("h:mm A")}` };
            }
        }

        return { status: "closedNow", hours: todayHours.join(" - ") };
    }
    const { status, hours: todayHours } = getStatus(hours);

    return (
        <View style={styles.container}>
            <Text
                style={
                    status === "openNow" ? styles.openText : styles.closedText
                }
            >
                {status === "openNow" ? "Open Now" : "Closed Now"}
            </Text>
            {status === "openNow" && (
                <Text style={styles.hoursText}>{todayHours}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    openText: {
        color: "#006600",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "600",
    },
    closedText: {
        color: "#ab0b03",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "600",
    },
    hoursText: {
        fontSize: 18,
        lineHeight: 24,
    },
});
