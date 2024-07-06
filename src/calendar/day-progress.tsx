import { useState, useEffect } from "react";

import { startOfDay, differenceInMinutes } from "date-fns";

import { cn } from "../utils";

const ONE_MINUTE = 60 * 1000;
const MINUTES_IN_DAY = 24 * 60;

type DayProgressProps = {
  className?: string;
  containerHeight: number;
};

export const DayProgress: React.FC<DayProgressProps> = ({
  className,
  containerHeight,
}) => {
  const [top, setTop] = useState(0);

  const today = new Date();
  const startOfToday = startOfDay(today);

  useEffect(() => {
    const updateTop = () => {
      const minutesPassed = differenceInMinutes(today, startOfToday);
      const percentage = minutesPassed / MINUTES_IN_DAY;
      const top = percentage * containerHeight;

      setTop(top);
    };

    updateTop();

    const interval = setInterval(() => updateTop(), ONE_MINUTE);

    return () => clearInterval(interval);
  }, [containerHeight]);

  return (
    <div
      aria-hidden
      style={{ top }}
      aria-label="day time progress"
      className={cn(
        "h-1 w-full absolute left-24 -translate-y-1/2 z-[1000000]",
        className
      )}
    >
      <div className="relative w-full h-full">
        <div
          aria-label="current time dot"
          className="w-4 aspect-square rounded-full absolute -left-2 top-1/2 -translate-y-1/2  bg-[rgb(234,67,53)]"
        />
        <div
          aria-label="current time line"
          className="h-[2px] w-full absolute top-1/2 -translate-y-1/2 bg-[rgb(234,67,53)]"
        />
      </div>
    </div>
  );
};
