import { useRef, useState, useEffect } from "react";

import { WeekEvent } from "../week-view/week-event";

import { WeekEvent as WeekEventType } from "./group-events";

type MonthWeekEventsViewProps = {
  date: Date;
  groups?: WeekEventType[][];
};

export const MonthWeekEventsView: React.FC<MonthWeekEventsViewProps> = ({
  date,
  groups = [],
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <div className="space-y-1 overflow-hidden" ref={ref}>
      {groups.map((events, groupIndex) => (
        <div className="h-6 relative" key={"group-" + groupIndex}>
          {events.map((event) => (
            <WeekEvent
              date={date}
              event={event}
              key={event.id}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
