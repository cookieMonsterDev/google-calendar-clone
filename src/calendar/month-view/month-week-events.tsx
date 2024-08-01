import React, { useRef, useState, useEffect } from "react";

import { Event } from "../types";

type MonthWeekEventsProps = {
  date: Date;
  events?: Event[];
};

export const MonthWeekEvents: React.FC = () => {
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

  return <div>month-week-events</div>;
};
