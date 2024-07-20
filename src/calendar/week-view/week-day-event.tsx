import { startOfDay, differenceInMinutes, format } from "date-fns";

import { Event } from "../types";

const MINUTES_IN_DAY = 24 * 60;

type WeekDayEventProps = {
  day: Date;
  event: Event;
  index: number;
  grouplength: number;
  containerHeight: number;
};

export const WeekDayEvent: React.FC<WeekDayEventProps> = ({
  day,
  event,
  index,
  grouplength,
  containerHeight,
}) => {
  const generateBoxStyle = () => {
    const today = startOfDay(day);
    const minutesPassed = differenceInMinutes(event.start_date, today);
    const eventDuration = differenceInMinutes(event.end_date, event.start_date);

    const top = (minutesPassed / MINUTES_IN_DAY) * containerHeight;
    const height = (eventDuration / MINUTES_IN_DAY) * containerHeight;

    const isLast = index === grouplength - 1;
    let widthPercentage = grouplength === 1 ? 1 : (1 / grouplength) * 1.7;

    if (isLast) {
      widthPercentage = 1 / grouplength;
    }

    const styles = {
      top,
      height,
      padding: "2px 8px",
      zIndex: 100 + index,
      width: `calc(100% * ${widthPercentage})`,
    };

    if (isLast) {
      return { ...styles, right: 0 };
    }

    return {
      ...styles,
      left: `calc(100% * ${(1 / grouplength) * index})`,
    };
  };

  return (
    <div
      style={generateBoxStyle()}
      className="bg-blue-400 border border-white rounded cursor-pointer absolute"
    >
      <h1 className="text-white text-xs">
        {`${event.title}, 
        ${format(event.start_date, "h:mm a")} - 
        ${format(event.end_date, "h:mm a")}`}
      </h1>
    </div>
  );
};
