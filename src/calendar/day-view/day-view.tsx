import { useState, useEffect } from "react";

import {
  format,
  isToday,
  endOfDay,
  startOfDay,
  eachHourOfInterval,
  differenceInMinutes,
} from "date-fns";

import type { Event } from "../types";

export type DayViewProps = {
  date: Date;
  events?: Event[];
};

export const DayView: React.FC<DayViewProps> = ({ date }) => {
  const [top, setTop] = useState(0);
  const [ref, setSetRef] = useState<HTMLDivElement | null>(null);

  const oneMinute = 60 * 1000;
  const minutesInDay = 24 * 60;
  const today = startOfDay(date);
  const isDayToday = isToday(date);

  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  useEffect(() => {
    const updateTop = () => {
      const containerHeight = ref?.offsetHeight || 1;
      const minutesPassed = differenceInMinutes(new Date(), today);
      const percentage = minutesPassed / minutesInDay;
      const top = percentage * containerHeight;

      setTop(top);
    };

    updateTop();

    const interval = setInterval(() => updateTop(), oneMinute);

    return () => clearInterval(interval);
  }, [ref]);

  return (
    <section id="calendar-day-view" className="flex-1 h-full">
      <div className="border-b flex scrollbar-gutter-stable">
        <div className="w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center border-l"></div>
      </div>
      <div className="flex-1 max-h-full overflow-y-scroll pb-28">
        <div className="relative" ref={(divRef) => setSetRef(divRef)}>
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
            <>
              <div
                aria-hidden
                style={{ top }}
                aria-label="current time dot"
                className="w-4 aspect-square rounded-full absolute left-[88px] -translate-y-1/2 bg-[rgb(234,67,53)]"
              />
              <div
                aria-hidden
                style={{ top }}
                aria-label="current time line"
                className="h-[2px] w-[calc(100%-95px)] absolute left-[88px] bg-[rgb(234,67,53)] -translate-y-1/2"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
