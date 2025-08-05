import React, { useState, useMemo } from "react";
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
} from "date-fns";

interface AvailabilityData {
    availability: {
        [month: string]: {
            [date: string]: Array<{
                start: string;
                end: string;
            }>;
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
    const [requiredDuration, setRequiredDuration] = useState(60); // minutes

    const monthKey = format(currentMonth, "yyyy-MM");
    const monthData = data.availability[monthKey] || {};

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
        ? filteredMonthData[selectedDateKey] || []
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
                                        className={`
                      p-3 rounded-lg text-sm font-medium transition-colors
                      ${
                          hasAvailability && !isPastDay
                              ? "hover:bg-ctp-surface2 cursor-pointer"
                              : "cursor-not-allowed"
                      }
                      ${
                          isSelected
                              ? "bg-ctp-mauve text-white hover:bg-ctp-mauve/75"
                              : ""
                      }
                      ${isToday(day) ? "ring-2 ring-ctp-mauve" : ""}
                      ${
                          hasAvailability && !isPastDay && !isSelected
                              ? "bg-ctp-surface1 text-ctp-green"
                              : ""
                      }
                      ${
                          !hasAvailability || isPastDay
                              ? "bg-ctp-surface1 text-ctp-maroon"
                              : ""
                      }
                    `}
                                    >
                                        {format(day, "d")}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-ctp-green/75 border border-ctp-green rounded" />
                                <span>Available</span>
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
                                        Timezone: {data.timezone}
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
