import { useState } from "react";

import { DayEvent } from "./day-event";
import { DayProgress } from "../day-progress";
import { AllDayEvent } from "./all-day-event";

import {
  format,
  isToday,
  endOfDay,
  startOfDay,
  eachHourOfInterval,
} from "date-fns";
import { groupEvents } from "./group-events";

import { cn } from "../../utils";

import type { Event } from "../types";

type DayViewProps = {
  date: Date;
  events?: Event[];
};

export const DayView: React.FC<DayViewProps> = ({ date, events = [] }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const isDayToday = isToday(date);

  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  const { eventGroups, allDayEvents } = groupEvents(date, events);

  return (
    <section id="calendar-day-view" className="flex-1 h-full">
      <div className="border-b flex scrollbar-gutter-stable">
        <div className="min-w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center border-l gap-[1px]">
          {allDayEvents.map((event) => (
            <AllDayEvent event={event} key={event.id} />
          ))}
        </div>
      </div>
      <div className="flex-1 max-h-full overflow-y-scroll pb-36">
        <div className="relative" ref={(ref) => setRef(ref)}>
          {eventGroups.map((group) =>
            group.map((event, index) => (
              <DayEvent
                day={date}
                event={event}
                index={index}
                key={event.id}
                grouplength={group.length}
                containerHeight={ref?.offsetHeight || 1}
              />
            ))
          )}
          {hours.map((time, index) => (
            <div className="h-14 flex" key={time.toISOString() + index}>
              <div className="h-full w-24 flex items-start justify-center">
                <time
                  className="text-xs -m-3 select-none"
                  dateTime={format(time, "yyyy-MM-dd")}
                >
                  {index === 0 ? "" : format(time, "h a")}
                </time>
              </div>
              <div
                className={cn(
                  "flex-1 relative border-l",
                  index !== hours.length - 1 && "border-b"
                )}
              />
            </div>
          ))}
          {isDayToday && (
            <DayProgress containerHeight={ref?.offsetHeight || 1} />
          )}
        </div>
      </div>
    </section>
  );
};
