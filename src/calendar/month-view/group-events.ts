import {
  add,
  isAfter,
  isBefore,
  endOfWeek,
  isSameDay,
  startOfDay,
  isSameWeek,
  startOfWeek,
  isWithinInterval,
  differenceInMilliseconds,
  endOfDay,
} from "date-fns";

import type { Event } from "../types";

const MILLISECONDS_IN_DAY = 86399999;
const MILLISECONDS_IN_WEEK = 604799999;

type WeekEvent = Event & {
  display_start_date: Date;
  display_end_date: Date;
};

type WeekEvents = {
  week_end_date: Date;
  week_start_date: Date;
  week_events: WeekEvent[];
  week_day_events: Record<string, Event[]>;
};

export type GroupedEvents = Record<string, WeekEvents>;

export const createWeekGroups = (
  events: Event[],
  weeks: Date[][]
): GroupedEvents => {
  const groups: GroupedEvents = {};

  for (let week of weeks) {
    const week_end_date = endOfDay(week[week.length - 1]);
    const week_start_date = startOfDay(week[0]);

    const weekKey =
      week_start_date.toISOString() + "-" + week_end_date.toISOString();

    groups[weekKey] = {
      week_end_date,
      week_start_date,
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

      console.log(event.title);

      groups[weekKey]?.week_events.push(newEvent);
    }
  }

  console.log(groups);

  return groups;
};
