import { useState } from "react";

import { DayProgress } from "../day-progress";

import { isToday, endOfDay, startOfDay, eachHourOfInterval } from "date-fns";

import { cn } from "../../utils";

import type { Event } from "../types";

type WeekDayViewProps = {
  day: Date;
  events?: Event[];
};

export const WeekDayView: React.FC<WeekDayViewProps> = ({
  day,
  events = [],
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const isDayToday = isToday(day);

  const hours = eachHourOfInterval({
    start: startOfDay(day),
    end: endOfDay(day),
  });

  return (
    <div
      aria-label={"Events slot for " + day.toDateString()}
      className="min-w-36 h-full flex flex-1"
    >
      <div className="w-full flex flex-col relative" ref={(ref) => setRef(ref)}>
        {hours.map((time, index) => (
          <div
            key={time.toISOString()}
            className={cn(
              "h-14 w-full border-l",
              index !== hours.length - 1 && "border-b"
            )}
          />
        ))}
        {isDayToday && (
          <DayProgress
            className="left-0"
            containerHeight={ref?.offsetHeight || 1}
          />
        )}
      </div>
    </div>
  );
};
