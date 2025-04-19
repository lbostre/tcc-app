import dayjs from "dayjs";
import { Day, OpenTimes } from '@/utils/types';

export function isOpen(time24: string, day: Day, hoursObject: OpenTimes): boolean {
    const parsedTime = dayjs(time24);
    const timeInMinutes = parsedTime.hour() * 60 + parsedTime.minute();

    const openTimes = hoursObject[day];
    if (!openTimes || openTimes.length === 0) return false;

    for (let i = 0; i < openTimes.length; i += 2) {
        const start = dayjs(openTimes[i]);
        const end = dayjs(openTimes[i + 1]);

        const startMinutes = start.hour() * 60 + start.minute();
        const endMinutes = end.hour() * 60 + end.minute();

        if (startMinutes <= endMinutes) {
            // Same-day range
            if (timeInMinutes >= startMinutes && timeInMinutes < endMinutes) return true;
        } else {
            // Overnight range (e.g., 10pm–2am)
            if (timeInMinutes >= startMinutes || timeInMinutes < endMinutes) return true;
        }
    }

    return false;
}
