import { useState } from "react";

import { DayProgress } from "../day-progress";
import { WeekDayEvent } from "./week-day-event";

import { cn } from "../../utils";
import { createDayGroups } from "./group-events";
import { isToday, endOfDay, startOfDay, eachHourOfInterval } from "date-fns";

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

  const dayGroups = createDayGroups(events);

  return (
    <div
      aria-label={"Events slot for " + day.toDateString()}
      className="min-w-36 h-full flex flex-1 relative"
    >
      <div className="w-[95%] h-full absolute">
        <div className="w-full h-full relative" ref={(ref) => setRef(ref)}>
          {dayGroups.map((group) =>
            group.map((event, index) => (
              <WeekDayEvent
                day={day}
                event={event}
                index={index}
                key={event.id}
                grouplength={group.length}
                containerHeight={ref?.offsetHeight || 1}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-full flex flex-col">
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
