import { add, isSameDay, isWithinInterval, startOfDay } from "date-fns";

import type { Event } from "../types";

export type GroupedEvents = {
  weekGroups: Event[];
  dayGroups: Record<string, Event[]>;
};

export const createGroups = (events: Event[]): GroupedEvents => {
  const weekGroups: Event[] = [];
  const dayGroups: Record<string, Event[]> = {};

  for (let event of events) {
    if (isSameDay(event.start_date, event.end_date)) {
      const key = startOfDay(event.start_date).toISOString();

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
