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
} from "date-fns";

import type { Event } from "../types";

const MILLISECONDS_IN_DAY = 86399999;

export type GroupedEvents = {
  weekGroups: Event[];
  dayGroups: Record<string, Event[]>;
};

export const createGroups = (events: Event[]): GroupedEvents => {
  const weekGroups: Event[] = [];
  const dayGroups: Record<string, Event[]> = {};

  for (let event of events) {
    const { start_date, end_date } = event;

    const same = isSameDay(start_date, end_date);
    const difference = differenceInMilliseconds(end_date, start_date);

    if (same && difference < MILLISECONDS_IN_DAY) {
      const key = startOfDay(start_date).toISOString();

      if (!dayGroups[key]) dayGroups[key] = [];

      dayGroups[key].push(event);
    } else {
      weekGroups.push(event);
    }
  }

  return { dayGroups, weekGroups };
};

export const createDayGroups = (
  events: Event[],
  groupedEvents: Event[][] = []
): Event[][] => {
  if (events.length <= 0) return groupedEvents;

  const [first, ...rest] = events;

  const eventsInRage = rest.filter((event) =>
    isWithinInterval(event.start_date, {
      start: first.start_date,
      end: add(first.end_date, { minutes: -1 }),
    })
  );

  const group = [first, ...eventsInRage];
  const sliced = rest.slice(eventsInRage.length);
  groupedEvents.push(group);

  return createDayGroups(sliced, groupedEvents);
};

export type WeekEvent = Event & {
  display_start_date: Date;
  display_end_date: Date;
};

export const createWeekGroups = (
  events: Event[],
  date = new Date()
): WeekEvent[][] => {
  const filteredEvents: WeekEvent[] = [];

  const weekEnd = endOfWeek(date);
  const weekStart = startOfWeek(date);

  for (let event of events) {
    const { end_date, start_date } = event;

    const isEnd = isSameWeek(end_date, date);
    const isStart = isSameWeek(start_date, date);
    const isMonth =
      isBefore(start_date, weekStart) && isAfter(end_date, weekEnd);

    if (!(isStart || isEnd || isMonth)) continue;

    const display_start_date = isBefore(start_date, weekStart)
      ? weekStart
      : start_date;
    const display_end_date = isAfter(end_date, weekEnd) ? weekEnd : end_date;

    filteredEvents.push({
      ...event,
      display_end_date,
      display_start_date,
    });
  }

  const sortedEvents = filteredEvents.sort(
    (a, b) => a.start_date.getTime() - b.start_date.getTime()
  );

  const groups: WeekEvent[][] = [];

  for (const event of sortedEvents) {
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1];

      if (lastEventInGroup.end_date.getTime() <= event.start_date.getTime()) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([event]);
    }
  }

  return groups;
};
