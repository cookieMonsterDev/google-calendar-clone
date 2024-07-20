import {
  add,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  differenceInMilliseconds,
} from "date-fns";

import type { Event } from "../types";

const MILLISECONDS_IN_DAY = 86399999;

export type GroupedEvents = {
  allDayEvents: Event[];
  eventGroups: Event[][];
};

const createGroups = (
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

  return createGroups(sliced, groupedEvents);
};

export const groupEvents = (date: Date, events: Event[]): GroupedEvents => {
  const eventsPresentToday = events.filter((event) => {
    const startBeforeEndToday =
      isBefore(event.start_date, date) && isSameDay(event.end_date, date);
    const startTodayEndAfter =
      isSameDay(event.start_date, date) && isAfter(event.end_date, date);
    const startTodayEndToday =
      isSameDay(event.start_date, date) && isSameDay(event.end_date, date);
    const startBeforeEndAfter =
      isBefore(event.start_date, date) && isAfter(event.end_date, date);
    return (
      startTodayEndAfter ||
      startTodayEndToday ||
      startBeforeEndToday ||
      startBeforeEndAfter
    );
  });

  const [allDayEvents, thisDayEvents]: Event[][] = eventsPresentToday.reduce(
    (acc: Event[][], cur) => {
      const { end_date, start_date } = cur;

      const same = isSameDay(start_date, end_date);
      const difference = differenceInMilliseconds(end_date, start_date);

      if (same && difference < MILLISECONDS_IN_DAY) {
        acc[1].push(cur);
      } else {
        acc[0].push(cur);
      }

      return acc;
    },
    [[], []]
  );

  const eventGroups = createGroups(thisDayEvents);

  return { eventGroups, allDayEvents };
};
