export function isOpen(time24: string, day: string, hoursArray: string[]) {
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const dayIndex = daysOfWeek.indexOf(day);
    if (dayIndex === -1) return false;
    const [hour, minute] = time24.split(":").map(Number);
    const currentMinutes = hour * 60 + minute; // Convert current time to minutes

    const prevDayIndex = (dayIndex - 1 + 7) % 7;
    const prevDayRange = hoursArray[prevDayIndex];

    function parseTime(timeStr: string) {
        const [time, period] = timeStr.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period.toLowerCase() === "pm" && h !== 12) h += 12;
        if (period.toLowerCase() === "am" && h === 12) h = 0;
        return h * 60 + (m || 0);
    }

    function isWithinRange(start: number, end: number) {
        if (start <= end) {
            return start <= currentMinutes && currentMinutes < end;
        } else if (prevDayRange !== "Closed") {
            return currentMinutes >= start || currentMinutes < end;
        } else {
            return currentMinutes >= start && currentMinutes < end + 24 * 60;
        }
    }

    const currentDayRange = hoursArray[dayIndex];

    if (currentDayRange !== "Closed") {
        const [startStr, endStr] = currentDayRange.split(" - ");
        const startTime = parseTime(startStr);
        const endTime = parseTime(endStr);
        if (isWithinRange(startTime, endTime)) return true;
    }

    if (prevDayRange !== "Closed") {
        const [prevStartStr, prevEndStr] = prevDayRange.split(" - ");
        const prevStartTime = parseTime(prevStartStr);
        const prevEndTime = parseTime(prevEndStr);

        if (prevStartTime > prevEndTime) {
            if (currentMinutes < prevEndTime) {
                return true;
            }
        }
    }

    return false;
}
