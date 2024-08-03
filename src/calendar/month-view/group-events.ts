import {
  endOfDay,
  endOfWeek,
  isSameDay,
  startOfDay,
  isSameWeek,
  startOfWeek,
  isWithinInterval,
  differenceInMilliseconds,
} from "date-fns";

import type { Event } from "../types";

const MILLISECONDS_IN_DAY = 86399999;
const MILLISECONDS_IN_WEEK = 604799999;

export type WeekEvent = Event & {
  display_start_date: Date;
  display_end_date: Date;
};

type WeekEvents = {
  week_events: WeekEvent[];
  week_day_events: Record<string, Event[]>;
};

export type GroupedEvents = Record<string, WeekEvents>;

export const createMonthGroups = (
  events: Event[],
  weeks: Date[][]
): GroupedEvents => {
  const groups: GroupedEvents = {};

  for (let week of weeks) {
    const weekEndDate = endOfDay(week[week.length - 1]);
    const weekStartDate = startOfDay(week[0]);

    const weekKey =
      weekStartDate.toISOString() + "-" + weekEndDate.toISOString();

    groups[weekKey] = {
      week_events: [],
      week_day_events: week.reduce((acc, cur) => {
        acc[cur.toISOString()] = [];
        return acc;
      }, {} as WeekEvents["week_day_events"]),
    };
  }

  for (let event of events) {
    const { start_date, end_date } = event;

    const same = isSameDay(start_date, end_date);
    const difference = differenceInMilliseconds(end_date, start_date);

    const eventWeekEndDate = endOfWeek(end_date).toISOString();
    const eventWeekStartDate = startOfWeek(start_date).toISOString();

    if (same && difference < MILLISECONDS_IN_DAY) {
      const weekKey = `${eventWeekStartDate}-${eventWeekEndDate}`;
      const dayKey = startOfDay(start_date).toISOString();

      groups[weekKey]?.week_day_events[dayKey]?.push(event);
    }

    if (
      difference >= MILLISECONDS_IN_DAY &&
      difference <= MILLISECONDS_IN_WEEK
    ) {
      const weekKey = `${eventWeekStartDate}-${eventWeekEndDate}`;

      const newEvent = {
        ...event,
        display_end_date: end_date,
        display_start_date: start_date,
      };

      groups[weekKey]?.week_events.push(newEvent);
    }

    if (difference > MILLISECONDS_IN_WEEK) {
      for (let week of weeks) {
        const weekStartDate = startOfDay(week[0]);
        const weekEndDate = endOfDay(week[week.length - 1]);

        const weekKey =
          weekStartDate.toISOString() + "-" + weekEndDate.toISOString();

        const isSameEnd = isSameWeek(end_date, weekEndDate);
        const isSameStart = isSameWeek(start_date, weekStartDate);
        const isInRageEnd = isWithinInterval(weekEndDate, {
          start: start_date,
          end: end_date,
        });
        const isInRageStart = isWithinInterval(weekStartDate, {
          start: start_date,
          end: end_date,
        });

        const newEvent = {
          ...event,
          display_end_date: end_date,
          display_start_date: start_date,
        };

        if (!isSameEnd && isInRageEnd) newEvent.display_end_date = weekEndDate;
        if (!isSameStart && isInRageStart)
          newEvent.display_start_date = weekStartDate;

        groups[weekKey]?.week_events.push(newEvent);
      }
    }
  }

  return groups;
};
