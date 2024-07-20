import { useRef, useState, useEffect } from "react";

import { WeekEvent } from "./week-event";

import { createWeekGroups } from "./group-events";

import { Event } from "../types";

type WeekEventsViewProps = {
  date: Date;
  events?: Event[];
};

export const WeekEventsView: React.FC<WeekEventsViewProps> = ({
  date,
  events = [],
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(1);

  const groups = createWeekGroups(events, date);

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
    <div className="mt-2 space-y-1 overflow-hidden" ref={ref}>
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
