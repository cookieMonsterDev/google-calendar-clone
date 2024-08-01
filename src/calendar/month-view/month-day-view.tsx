import { format } from "date-fns";

import { Event } from "../types";

type MonthDayViewProps = {
  show?: number;
  events: Event[];
};

export const MonthDayView: React.FC<MonthDayViewProps> = ({
  events,
  show = 1,
}) => {
  const number = show === 1 ? events.length : events.length - show;

  return (
    <ul className="pl-4 pr-6 flex-1 space-y-1 overflow-hidden">
      {events.map((event) => (
        <li className="flex items-center">
          <svg className="mr-2 min-w-2 w-2 h-2 text-blue-400 fill-blue-400">
            <circle cx="4" cy="4" r="4" />
          </svg>
          <p className="text-sm text-nowrap text-ellipsis">
            {`${format(event.start_date, "h:mmaaa")}, ${event.title}`}
          </p>
        </li>
      ))}
    </ul>

    // <h2>{number} more</h2>
  );
};
