import { format, isWithinInterval } from "date-fns";

import { Event } from "../types";

const MAX_EVENTS_TO_DISPLAY = 6;

type MonthDayViewProps = {
  day?: Date;
  events?: Event[];
  restEvents?: Event[];
  weekEventsShown?: number;
};

export const MonthDayView: React.FC<MonthDayViewProps> = ({
  events = [],
  restEvents = [],
  day = new Date(),
  weekEventsShown = 0,
}) => {
  const filteredRestEvents = restEvents.filter((event) =>
    isWithinInterval(day, {
      end: event.end_date,
      start: event.start_date,
    })
  );

  const canDisplayEvents = MAX_EVENTS_TO_DISPLAY - weekEventsShown;
  const allEvents = [...events, ...filteredRestEvents];
  const allEventsNumber = allEvents.length;

  let eventsToDisplay: Event[] = [];
  let moreEventsNumber = 0;

  if (canDisplayEvents > 1) {
    eventsToDisplay = allEvents.slice(0, canDisplayEvents);
    moreEventsNumber = allEventsNumber - eventsToDisplay.length;
  }

  if (canDisplayEvents === 1 && allEventsNumber === 1) {
    eventsToDisplay = allEvents.slice(0, 1);
    moreEventsNumber = 0;
  }

  if (canDisplayEvents === 1 && allEventsNumber > 1) {
    moreEventsNumber = allEventsNumber;
  }

  return (
    <ul className="pl-4 pr-6 flex-1 space-y-1 overflow-hidden">
      {eventsToDisplay.map((event) => (
        <li className="flex items-center" key={event.id}>
          <svg className="mr-2 min-w-2 w-2 h-2 text-blue-400 fill-blue-400">
            <circle cx="4" cy="4" r="4" />
          </svg>
          <p className="text-sm text-nowrap text-ellipsis">
            {`${format(event.start_date, "h:mmaaa")}, ${event.title}`}
          </p>
        </li>
      ))}
      {moreEventsNumber > 0 && (
        <li className="flex items-center">
          <p className="text-sm text-nowrap text-ellipsis">
            {moreEventsNumber} more
          </p>
        </li>
      )}
    </ul>
  );
};
