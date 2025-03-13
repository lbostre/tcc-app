import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";

type OpenClosedTextProps = {
    hours: string[];
};

export function OpenClosedText({ hours }: OpenClosedTextProps) {
    function getStatus(openTimes: string[]) {
        const now = new Date();
        const dayIndex = (now.getDay() + 6) % 7; // Convert Sunday-based index to Monday-based
        const todayHours = openTimes[dayIndex];

        if (todayHours === "Closed" || !todayHours) return { status: "closedToday" };

        const [openTime, closeTime] = todayHours.split(" - ").map((timeStr) => {
            const [time, period] = timeStr.split(" ");
            let [hour, minute] = time.split(":").map(Number);
            if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
            if (period.toLowerCase() === "am" && hour === 12) hour = 0;

            return hour * 60 + minute; // Convert to minutes for easy comparison
        });

        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        if (nowMinutes >= openTime && nowMinutes <= closeTime) {
            return { status: "openNow", hours: todayHours };
        }

        return { status: "closedNow", hours: todayHours };
    }
    const { status, hours: todayHours } = getStatus(hours);

    return (
        <View style={styles.container}>
            <Text
                style={
                    status === "openNow" ? styles.openText : styles.closedText
                }
            >
                {status === "openNow" ? "Open Now" : "Closed"}
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
        gap: 16,
        alignItems: "center",
    },
    openText: {
        color: "green",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    closedText: {
        color: "red",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    hoursText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
