import { WeekDayView } from "./week-day-view";
import { WeekDayLabel } from "./week-day-label";
import { WeekEventsView } from "./week-events-view";

import {
  format,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  eachDayOfInterval,
  eachHourOfInterval,
} from "date-fns";
import { createGroups } from "./group-events";

import { Event } from "../types";

type WeekViewProps = {
  date: Date;
  events?: Event[];
};

export const WeekView: React.FC<WeekViewProps> = ({ date, events = [] }) => {
  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  const days = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

  const { weekGroups, dayGroups } = createGroups(events);

  return (
    <section
      id="calendar-day-view"
      className="flex-1 flex flex-col overflow-x-auto overflow-y-hidden"
    >
      <div className="min-w-[calc(96px+(144px*7))] flex border-b scrollbar-gutter-stable">
        <div className="min-w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="relative flex flex-1">
            {days.map((day) => (
              <WeekDayLabel
                day={day}
                key={"week-day-label-" + day.toISOString()}
              />
            ))}
          </div>
          <div className="relative min-h-6">
            <WeekEventsView date={date} events={weekGroups} />

            <div className="absolute inset-0 h-full flex flex-1">
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
              <div className="flex-1 min-w-36 border-l" />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-[calc(96px+(144px*7))] flex overflow-y-auto">
        <div className="h-fit flex flex-col">
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
        <div className="flex flex-1 h-fit">
          {days.map((day) => {
            const iso = day.toISOString();
            return <WeekDayView day={day} key={iso} events={dayGroups[iso]} />;
          })}
        </div>
      </div>
    </section>
  );
};
