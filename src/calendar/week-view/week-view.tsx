import { WeekDayLabel } from "./week-day-label";

import {
  format,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  eachDayOfInterval,
  eachHourOfInterval,
} from "date-fns";

import { Event } from "../types";
import { WeekDayView } from "./week-day-view";

type WeekViewProps = {
  date: Date;
  events?: Event[];
};

export const WeekView: React.FC<WeekViewProps> = ({ date }) => {
  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  const days = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

  return (
    <section id="calendar-day-view" className="flex-1 h-full">
      <div className="border-b flex scrollbar-gutter-stable">
        <div className="min-w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="relative flex flex-1">
          {days.map((day) => (
            <WeekDayLabel
              day={day}
              key={"week-day-label-" + day.toISOString()}
            />
          ))}
        </div>
      </div>
      <div className="flex max-h-full overflow-y-scroll pb-36">
        <div className="flex flex-col h-full">
          {hours.map((time, index) => (
            <div
              key={time.toISOString() + index}
              aria-label={format(time, "h a")}
              className="min-h-14 w-24 flex items-start justify-center"
            >
              <time
                className="text-xs -m-3 select-none"
                dateTime={format(time, "yyyy-MM-dd")}
              >
                {index === 0 ? "" : format(time, "h a")}
              </time>
            </div>
          ))}
        </div>
        <div className="flex flex-1 h-full">
          {days.map((day) => (
            <WeekDayView day={day} key={day.toISOString()} />
          ))}
        </div>
      </div>
    </section>
  );
};
