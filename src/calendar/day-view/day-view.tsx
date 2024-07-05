import { useState } from "react";

import {
  format,
  isToday,
  endOfDay,
  startOfDay,
  eachHourOfInterval,
} from "date-fns";

import { DayProgress } from "./day-progress";

import type { Event } from "../types";

export type DayViewProps = {
  date: Date;
  events?: Event[];
};

export const DayView: React.FC<DayViewProps> = ({ date }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const isDayToday = isToday(date);

  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  return (
    <section id="calendar-day-view" className="flex-1 h-full">
      <div className="border-b flex scrollbar-gutter-stable">
        <div className="w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center border-l"></div>
      </div>
      <div className="flex-1 max-h-full overflow-y-scroll pb-28">
        <div className="relative" ref={(ref) => setRef(ref)}>
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
              <div className="flex-1 relative border-b border-l" />
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
