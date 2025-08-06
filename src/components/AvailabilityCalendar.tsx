import React, { useState, useMemo, useEffect } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addMonths,
    isSameDay,
    isToday,
    isPast,
    parseISO,
} from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

interface AvailabilityData {
    availability: {
        [month: string]: {
            [date: string]: Array<{
                start: string;
                end: string;
            }>;
        };
    };
    events: {
        [month: string]: {
            [date: string]: number;
        };
    };
    timezone: string;
}

interface Props {
    data: AvailabilityData;
}

const AvailabilityCalendar: React.FC<Props> = ({ data }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [requiredDuration, setRequiredDuration] = useState(60);

    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Set duration from URL query parameter on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const durationParam = urlParams.get("duration");
        if (durationParam) {
            const duration = parseInt(durationParam, 10);
            const allowedDurations = [30, 60, 90, 120, 150, 180, 240];
            if (allowedDurations.includes(duration)) {
                setRequiredDuration(duration);
            }
        }
    }, []);

    // Convert availability data from server timezone to user timezone
    const convertedAvailabilityData = useMemo(() => {
        const converted: typeof data.availability = {};

        Object.entries(data.availability).forEach(([monthKey, monthData]) => {
            const convertedMonth: typeof monthData = {};

            Object.entries(monthData).forEach(([dateKey, slots]) => {
                slots.forEach((slot) => {
                    // Parse the date and time in server timezone
                    const slotStartDateTime = parseISO(
                        `${dateKey}T${slot.start}:00`,
                    );
                    const slotEndDateTime = parseISO(
                        `${dateKey}T${slot.end}:00`,
                    );

                    // Convert from server timezone to user timezone
                    const userStartTime = toZonedTime(
                        fromZonedTime(slotStartDateTime, data.timezone),
                        userTimezone,
                    );
                    const userEndTime = toZonedTime(
                        fromZonedTime(slotEndDateTime, data.timezone),
                        userTimezone,
                    );

                    // Format times in user timezone
                    const userStartTimeStr = formatInTimeZone(
                        userStartTime,
                        userTimezone,
                        "HH:mm",
                    );
                    const userEndTimeStr = formatInTimeZone(
                        userEndTime,
                        userTimezone,
                        "HH:mm",
                    );

                    // Check if the slot moved to a different day
                    const userStartDate = formatInTimeZone(
                        userStartTime,
                        userTimezone,
                        "yyyy-MM-dd",
                    );
                    const userEndDate = formatInTimeZone(
                        userEndTime,
                        userTimezone,
                        "yyyy-MM-dd",
                    );

                    // Add slot to the appropriate date(s)
                    if (userStartDate === userEndDate) {
                        // Slot stays within the same day
                        if (!convertedMonth[userStartDate]) {
                            convertedMonth[userStartDate] = [];
                        }
                        convertedMonth[userStartDate].push({
                            start: userStartTimeStr,
                            end: userEndTimeStr,
                        });
                    } else {
                        // Slot spans across days - split it
                        if (!convertedMonth[userStartDate]) {
                            convertedMonth[userStartDate] = [];
                        }
                        convertedMonth[userStartDate].push({
                            start: userStartTimeStr,
                            end: "23:59",
                        });

                        if (!convertedMonth[userEndDate]) {
                            convertedMonth[userEndDate] = [];
                        }
                        // Only add if the end time is not 00:00 (which would create invalid 00:00-00:00 slots)
                        if (userEndTimeStr !== "00:00") {
                            convertedMonth[userEndDate].push({
                                start: "00:00",
                                end: userEndTimeStr,
                            });
                        }
                    }
                });
            });

            converted[monthKey] = convertedMonth;
        });

        return converted;
    }, [data.availability, data.timezone, userTimezone]);

    // Convert events data from server timezone to user timezone
    const convertedEventsData = useMemo(() => {
        const converted: typeof data.events = {};

        Object.entries(data.events).forEach(([monthKey, monthEvents]) => {
            const convertedMonth: typeof monthEvents = {};

            Object.entries(monthEvents).forEach(([dateKey, eventCount]) => {
                // For events, we need to check if they might have moved to adjacent days
                // We'll distribute the events across the potential days they could appear in user timezone
                const serverDate = parseISO(`${dateKey}T12:00:00`);
                const userDate = toZonedTime(
                    fromZonedTime(serverDate, data.timezone),
                    userTimezone,
                );
                const userDateKey = formatInTimeZone(
                    userDate,
                    userTimezone,
                    "yyyy-MM-dd",
                );

                convertedMonth[userDateKey] =
                    (convertedMonth[userDateKey] ?? 0) + eventCount;
            });

            converted[monthKey] = convertedMonth;
        });

        return converted;
    }, [data.events, data.timezone, userTimezone]);

    const monthKey = format(currentMonth, "yyyy-MM");
    const monthData = convertedAvailabilityData[monthKey] ?? {};
    const monthEvents = convertedEventsData[monthKey] ?? {};

    // Helper function to find consecutive available slots
    const findConsecutiveSlots = (
        slots: Array<{ start: string; end: string }>,
        durationMinutes: number,
    ) => {
        const slotsNeeded = Math.ceil(durationMinutes / 30);
        const consecutiveSlots: Array<{ start: string; end: string }> = [];

        for (let i = 0; i <= slots.length - slotsNeeded; i++) {
            const currentSlots = slots.slice(i, i + slotsNeeded);

            // Check if slots are consecutive
            let isConsecutive = true;
            for (let j = 1; j < currentSlots.length; j++) {
                const prevSlot = currentSlots[j - 1];
                const currentSlot = currentSlots[j];
                if (prevSlot?.end !== currentSlot?.start) {
                    isConsecutive = false;
                    break;
                }
            }

            if (
                isConsecutive &&
                currentSlots[0] &&
                currentSlots[currentSlots.length - 1]
            ) {
                consecutiveSlots.push({
                    start: currentSlots[0].start,
                    end: currentSlots[currentSlots.length - 1]!.end,
                });
            }
        }

        return consecutiveSlots;
    };

    // Filter month data to only include days with required duration available
    const filteredMonthData = useMemo(() => {
        const filtered: typeof monthData = {};

        Object.entries(monthData).forEach(([dateKey, slots]) => {
            const consecutiveSlots = findConsecutiveSlots(
                slots,
                requiredDuration,
            );
            if (consecutiveSlots.length > 0) {
                filtered[dateKey] = consecutiveSlots;
            }
        });

        return filtered;
    }, [monthData, requiredDuration]);

    const calendarDays = useMemo(() => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const days = eachDayOfInterval({ start, end });

        // Add padding for the first week (Monday = 0, Sunday = 6)
        const startPadding = (getDay(start) + 6) % 7;
        const paddedDays = Array(startPadding).fill(null).concat(days);

        return paddedDays;
    }, [currentMonth]);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleDurationChange = (newDuration: number) => {
        setRequiredDuration(newDuration);
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(addMonths(currentMonth, -1));
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const selectedDateKey = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : null;
    const selectedDateSlots = selectedDateKey
        ? (filteredMonthData[selectedDateKey] ?? [])
        : [];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Duration Filter */}
            <div className="mb-6 bg-ctp-surface0 rounded-lg shadow-lg p-4">
                <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-ctp-text mb-2"
                >
                    Meeting duration needed:
                </label>
                <select
                    id="duration"
                    value={requiredDuration}
                    onChange={(e) =>
                        handleDurationChange(Number(e.target.value))
                    }
                    className="block bg-ctp-surface1 w-full px-3 py-2 border border-ctp-overlay0 rounded-md shadow-sm focus:outline-none focus:ring-ctp-mauve focus:border-ctp-mauve"
                >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                    <option value={150}>2.5 hours</option>
                    <option value={180}>3 hours</option>
                    <option value={240}>4 hours</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar View */}
                <div>
                    <div className="bg-ctp-surface0 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={handlePreviousMonth}
                                className="p-2 hover:bg-ctp-surface1 rounded"
                                aria-label="Previous month"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <h2 className="text-xl font-semibold">
                                {format(currentMonth, "MMMM yyyy")}
                            </h2>
                            <button
                                onClick={handleNextMonth}
                                className="p-2 hover:bg-ctp-surface1 rounded"
                                aria-label="Next month"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-sm font-medium text-ctp-subtext0 py-2"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, index) => {
                                if (!day) {
                                    return <div key={`empty-${index}`} />;
                                }

                                const dayKey = format(day, "yyyy-MM-dd");
                                const hasAvailability =
                                    (filteredMonthData[dayKey]?.length ?? 0) >
                                    0;
                                const hasEvents =
                                    (monthEvents[dayKey] ?? 0) > 0;
                                const isSelected =
                                    selectedDate &&
                                    isSameDay(day, selectedDate);
                                const isPastDay = isPast(day) && !isToday(day);

                                return (
                                    <button
                                        key={dayKey}
                                        onClick={() =>
                                            hasAvailability &&
                                            handleDateClick(day)
                                        }
                                        disabled={!hasAvailability || isPastDay}
                                        className={twMerge(
                                            "p-3 rounded-lg text-sm font-medium transition-colors bg-ctp-surface1",
                                            isToday(day)
                                                ? "ring-2 ring-ctp-mauve"
                                                : "",
                                            hasAvailability &&
                                                !isPastDay &&
                                                hasEvents &&
                                                !isSelected
                                                ? "text-ctp-yellow"
                                                : "",
                                            hasAvailability &&
                                                !isPastDay &&
                                                !hasEvents &&
                                                !isSelected
                                                ? "text-ctp-green"
                                                : "",
                                            hasAvailability && !isPastDay
                                                ? "hover:bg-ctp-surface2 cursor-pointer"
                                                : "cursor-not-allowed text-ctp-red",
                                            isSelected
                                                ? "bg-ctp-mauve text-ctp-crust hover:bg-ctp-mauve/75"
                                                : "",
                                        )}
                                    >
                                        {format(day, "d")}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 text-sm">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-ctp-green/75 border border-ctp-green rounded" />
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-ctp-yellow/75 border border-ctp-yellow rounded" />
                                <span>Partially Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-ctp-maroon/75 border border-ctp-maroon rounded" />
                                <span>Unavailable</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Slots */}
                <div>
                    {selectedDate ? (
                        <div className="bg-ctp-surface0 rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Available{" "}
                                {requiredDuration >= 60
                                    ? `${requiredDuration / 60}${requiredDuration % 60 === 0 ? "" : ".5"} hour`
                                    : `${requiredDuration} minute`}{" "}
                                slots for {format(selectedDate, "MMMM d, yyyy")}
                            </h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {selectedDateSlots.length > 0 ? (
                                    selectedDateSlots.map((slot, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleSlotClick(
                                                    `${slot.start}-${slot.end}`,
                                                )
                                            }
                                            className={`
                        w-full p-3 rounded-lg text-left transition-colors
                        ${
                            selectedSlot === `${slot.start}-${slot.end}`
                                ? "bg-ctp-mauve"
                                : "bg-ctp-surface1 hover:bg-ctp-surface2"
                        }
                      `}
                                        >
                                            {slot.start} - {slot.end}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No available slots for this date
                                    </p>
                                )}
                            </div>

                            {selectedSlot && (
                                <div className="mt-6 p-4 bg-ctp-surface1 rounded-lg">
                                    <p className="text-sm">
                                        Selected:{" "}
                                        {format(selectedDate, "MMM d")} at{" "}
                                        {selectedSlot}
                                    </p>
                                    <p className="text-xs mt-1">
                                        Timezone: {userTimezone}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-ctp-surface0 rounded-lg p-8 text-center">
                            <p>Select a date to view available time slots</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvailabilityCalendar;
