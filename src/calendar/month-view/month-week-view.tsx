import { MonthDayView } from "./month-day-view";
import { MonthWeekEventsView } from "./month-week-events-view";

import { cn } from "../../utils";
import { cva } from "class-variance-authority";
import { createWeekGroups } from "../week-view/group-events";
import { format, isToday, isSameDay, startOfMonth } from "date-fns";

import { Event } from "../types";
import { WeekEvent } from "./group-events";

type MonthWeekViewProps = {
  week: Date[];
  week_events: WeekEvent[];
  week_day_events: Record<string, Event[]>;
};

const dayLabelVariants = cva(
  "my-2 flex justify-center items-center text-sm font-semibold",
  {
    variants: {
      variant: {
        default: "bg-transparent text-gray-500",
        today: "bg-blue-400 text-white",
      },
      size: {
        default: "w-6 h-6 rounded-full",
        startOfMonth: "px-2 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const MonthWeekView: React.FC<MonthWeekViewProps> = ({
  week,
  week_events = [],
  week_day_events = {},
}) => {
  const groups = createWeekGroups(week_events, week[3]);
  const limitedGroups = groups.slice(0, 5);
  const restEvents = groups.slice(5).flat(1);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full flex">
        {week.map((day) => {
          const isStartOfMonth = isSameDay(day, startOfMonth(day));

          const variant = isToday(day) ? "today" : "default";
          const size = isStartOfMonth ? "startOfMonth" : "default";
          const text = isStartOfMonth
            ? format(day, "d, MMM")
            : format(day, "d");

          const className = cn(dayLabelVariants({ variant, size }));

          return (
            <div
              key={"day-label-" + day.toISOString()}
              className="flex-1 flex flex-col items-center border-b border-l last:border-r"
            >
              <h2 className={className}>{text}</h2>
            </div>
          );
        })}
      </div>
      <div className="mt-10 mb-5 absolute inset-0 space-y-1 overflow-hidden">
        <MonthWeekEventsView date={week[3]} groups={limitedGroups} />
        <div className="min-h-6 flex">
          {week.map((day) => {
            const dayKey = day.toISOString();
            const events = week_day_events[dayKey];
            return (
              <MonthDayView
                day={day}
                key={dayKey}
                events={events}
                restEvents={restEvents}
                weekEventsShown={limitedGroups.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
