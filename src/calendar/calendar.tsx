import { useState, useCallback } from "react";

import { DayView } from "./day-view";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../utils";
import { add, sub, endOfWeek, startOfWeek, formatDate } from "date-fns";

import type { Event } from "./types";

type View = "day" | "week" | "month";

export type CalendarProps = {
  view?: View;
  events?: Event[];
  date: string | number | Date;
};

export const Calendar: React.FC<CalendarProps> = ({
  date,
  events,
  view = "day",
}) => {
  const [curView, setCurView] = useState<View>(view);
  const [curDate, setCurDate] = useState<Date>(new Date(date));

  const onPrev = useCallback(() => {
    if (curView === "day") {
      return setCurDate((prev) => sub(prev, { days: 1 }));
    }

    if (curView === "week") {
      return setCurDate((prev) => sub(prev, { weeks: 1 }));
    }

    return setCurDate((prev) => sub(prev, { months: 1 }));
  }, [curView]);

  const onNext = useCallback(() => {
    if (curView === "day") {
      return setCurDate((prev) => add(prev, { days: 1 }));
    }

    if (curView === "week") {
      return setCurDate((prev) => add(prev, { weeks: 1 }));
    }

    return setCurDate((prev) => add(prev, { months: 1 }));
  }, [curView]);

  const formatDateForView = useCallback(
    (date: Date) => {
      if (curView === "day") {
        return formatDate(date, "dd MMMM yyyy");
      }

      if (curView === "week") {
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);

        const startMonth = formatDate(weekStart, "MMM");
        const endMonth = formatDate(weekEnd, "MMM");
        const year = formatDate(weekStart, "yyyy");

        if (startMonth !== endMonth) {
          return `${startMonth} – ${endMonth} ${year}`;
        } else {
          return `${startMonth} ${year}`;
        }
      }

      return formatDate(date, "MMMM yyyy");
    },
    [curView]
  );

  return (
    <div
      id="calendar"
      className="w-full h-full flex-1 flex flex-col overflow-hidden"
    >
      <section
        id="calendar-header"
        className="mb-6 w-full flex justify-between"
      >
        <div className="flex gap-2 items-center">
          <button
            aria-label="set date today"
            onClick={() => setCurDate(new Date())}
            className="py-2 px-3 border border-gray-200 rounded-md font-semibold hover:bg-blue-100 transition-colors duration-300"
          >
            Today
          </button>
          <button
            onClick={onPrev}
            aria-label={`prev ${curView}`}
            className="w-[42px] aspect-square border border-gray-200 rounded-md font-semibold flex justify-center items-center hover:bg-blue-100 transition-colors duration-300"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={onNext}
            aria-label={`next ${curView}`}
            className="w-[42px] aspect-square border border-gray-200 rounded-md font-semibold flex justify-center items-center hover:bg-blue-100 transition-colors duration-300"
          >
            <ChevronRight />
          </button>
          <span className="ml-6 font-semibold text-xl">
            {formatDateForView(curDate)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="set month view"
            onClick={() => setCurView("month")}
            className={cn(
              "py-2 px-3 border border-gray-200 rounded-md font-semibold hover:bg-blue-100 transition-colors duration-300",
              curView === "month" && "bg-blue-400 text-white hover:bg-blue-700"
            )}
          >
            Month
          </button>
          <button
            aria-label="set month week"
            onClick={() => setCurView("week")}
            className={cn(
              "py-2 px-3 border border-gray-200 rounded-md font-semibold hover:bg-blue-100 transition-colors duration-300",
              curView === "week" && "bg-blue-400 text-white hover:bg-blue-700"
            )}
          >
            Week
          </button>
          <button
            aria-label="set month day"
            onClick={() => setCurView("day")}
            className={cn(
              "py-2 px-3 border border-gray-200 rounded-md font-semibold hover:bg-blue-100 transition-colors duration-300",
              curView === "day" && "bg-blue-400 text-white hover:bg-blue-700"
            )}
          >
            Day
          </button>
        </div>
      </section>
      {curView === "day" && <DayView date={curDate} events={events} />}
      {curView === "week" && <>week view</>}
      {curView === "month" && <>month view</>}
    </div>
  );
};
