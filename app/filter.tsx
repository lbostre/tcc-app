import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SetStateAction, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';

export default function Filter() {
    const { from } = useLocalSearchParams<{ from: "/" | "/list" }>();
    const [day, setDay] = useState("Select");
    const [time, setTime] = useState<Date>(new Date());

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
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </View>
                <ThemedText type="subtitle">Select Time</ThemedText>
                {Platform.OS == "android" && 
                    <>
                        <TouchableOpacity style={styles.showTimePickerButton} onPress={showTimePicker}>
                            <ThemedText>Select Time</ThemedText>
                            <AntDesign name="clockcircleo" size={20} color="black" />
                        </TouchableOpacity>
                        <ThemedText>Selected Time: {time.toLocaleTimeString()}</ThemedText>
                    </>
                }
                {Platform.OS === "ios" && 
                    <View style={styles.timeContainer}>
                        <ThemedText>Edit Time: </ThemedText>
                        <DateTimePicker
                            value={time}
                            mode="time"
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) setTime(selectedDate);
                            }}
                        />
                    </View>
                }
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={{ ...styles.bottomButton }} onPress={() => router.replace({ pathname: from, params: { day: null, time: null}})}>
                        <ThemedText type="defaultSemiBold">Reset</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.bottomButton, backgroundColor: "black" }} onPress={() => router.replace({ pathname: from, params: { day: day, time: time.toISOString()}})}>
                        <ThemedText type="defaultSemiBold" style={{color: "white"}}>Apply</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 32,
        paddingVertical: 24,

    },
    container: {
        flexDirection: "column",
        flex: 1,
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
    timeContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
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
