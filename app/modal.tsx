import { StyleSheet, Text, View, Button, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';

export default function Modal() {
    const { from } = useLocalSearchParams<{ from: "/" | "/list" }>();
    const [day, setDay] = useState("Select");
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const showTimePicker = () => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: time,
                mode: "time",
                is24Hour: true,
                onChange: (event, selectedDate) => {
                    if (selectedDate) setTime(selectedDate);
                },
            });
        } else {
            setShowPicker(true);
        }
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title">Filter</ThemedText>
            <View style={styles.dayContainer}>
                <ThemedText type="subtitle">Select Day</ThemedText>
                <Picker
                    selectedValue={day}
                    onValueChange={(itemValue) => setDay(itemValue)}
                    style={{ width: "100%" }}
                >
                    <Picker.Item label="Select Day" value="select" />
                    <Picker.Item label="Monday" value="monday" />
                    <Picker.Item label="Tuesday" value="tuesday" />
                    <Picker.Item label="Wednesday" value="wednesday" />
                    <Picker.Item label="Thursday" value="thursday" />
                    <Picker.Item label="Friday" value="friday" />
                    <Picker.Item label="Saturday" value="saturday" />
                    <Picker.Item label="Sunday" value="sunday" />
                </Picker>
            </View>
            <ThemedText type="subtitle">Select Time</ThemedText>
            <TouchableOpacity style={styles.showTimePickerButton} onPress={showTimePicker}>
                <ThemedText>Select Time</ThemedText>
                <AntDesign name="clockcircleo" size={20} color="black" />
            </TouchableOpacity>
            <Text>Selected Time: {time.toLocaleTimeString()}</Text>
            {Platform.OS === "ios" && showPicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) setTime(selectedDate);
                    }}
                />
            )}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={{ ...styles.bottomButton }} onPress={() => console.log("clear")}>
                    <ThemedText type="defaultSemiBold">Clear</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.bottomButton, backgroundColor: "black" }} onPress={() => router.replace({ pathname: from, params: { day: day, time: time.toISOString() } })}>
                    <ThemedText type="defaultSemiBold" style={{color: "white"}}>Apply</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: 32,
        paddingVertical: 24,
        gap: 14,
        overflow: "hidden",
    },
    dayContainer: {
        flexDirection: "column",
        gap: 6,
    },
    showTimePickerButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        alignSelf: "flex-start",
    },
    bottomButtonContainer: {
        flexDirection: "row",
        width: "100%",
        gap: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    bottomButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 40,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 2,
        fontWeight: "bold"
    }

});
