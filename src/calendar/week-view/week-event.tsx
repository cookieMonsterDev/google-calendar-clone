import { startOfWeek, differenceInMinutes, format } from "date-fns";

import { WeekEvent as Event } from "./group-events";

const MINUTES_IN_WEEK = 7 * 24 * 60;

type WeekEventProps = {
  date: Date;
  event: Event;
  containerWidth: number;
};

export const WeekEvent: React.FC<WeekEventProps> = ({
  date,
  event,
  containerWidth,
}) => {
  const generateBoxStyle = () => {
    const week = startOfWeek(date);
    const eventDuration = differenceInMinutes(
      event.display_end_date,
      event.display_start_date
    );
    const minutesPassed = differenceInMinutes(event.display_start_date, week);

    const left = (minutesPassed / MINUTES_IN_WEEK) * containerWidth;
    const width = (eventDuration / MINUTES_IN_WEEK) * containerWidth;

    return { left, width: `calc(${width}px - 1px)` };
  };

  return (
    <div
      style={generateBoxStyle()}
      className="h-full px-2 absolute z-10 bg-blue-400 rounded cursor-pointer"
    >
      <h1 className="text-white text-sm text-ellipsis overflow-hidden">
        {`${format(event.start_date, "h:mm a")}, ${event.title}`}
      </h1>
    </div>
  );
};
