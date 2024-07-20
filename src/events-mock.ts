import {
  add,
  sub,
  endOfToday,
  startOfToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

import type { Event } from "./calendar";

export const eventsMock: Event[] = [
  {
    id: "1",
    start_date: add(startOfToday(), { hours: 12, minutes: 30 }),
    end_date: add(startOfToday(), { hours: 13, minutes: 30 }),
    title: "First",
  },
  {
    id: "2",
    start_date: add(startOfToday(), { hours: 12, minutes: 45 }),
    end_date: add(startOfToday(), { hours: 13, minutes: 30 }),
    title: "Second",
  },
  {
    id: "3",
    start_date: add(startOfToday(), { hours: 13 }),
    end_date: add(startOfToday(), { hours: 13, minutes: 45 }),
    title: "Third",
  },
  {
    id: "4",
    start_date: add(startOfToday(), { hours: 13, minutes: 15 }),
    end_date: add(startOfToday(), { hours: 14, minutes: 15 }),
    title: "Fourth",
  },
  {
    id: "5",
    start_date: add(startOfToday(), { hours: 15, minutes: 30 }),
    end_date: add(startOfToday(), { hours: 15, minutes: 55 }),
    title: "Fifths",
  },
  {
    id: "9",
    start_date: add(startOfToday(), { days: 1, hours: 6 }),
    end_date: add(startOfToday(), { days: 1, hours: 6, minutes: 30 }),
    title: "Tomorrow event",
  },
  {
    id: "10",
    start_date: sub(startOfToday(), { hours: 12 }),
    end_date: sub(startOfToday(), { hours: 11 }),
    title: "Yesterday event",
  },
  {
    id: "6",
    start_date: startOfToday(),
    end_date: endOfToday(),
    title: "All day event",
  },
  {
    id: "11",
    start_date: startOfWeek(new Date()),
    end_date: endOfWeek(new Date()),
    title: "Week event",
  },
  {
    id: "12",
    start_date: sub(startOfToday(), { days: 3 }),
    end_date: sub(endOfToday(), { days: 1 }),
    title: "3 days event 1",
  },
  {
    id: "13",
    start_date: sub(startOfToday(), { days: 4 }),
    end_date: sub(endOfToday(), { days: 2 }),
    title: "3 days event 2",
  },
  {
    id: "14",
    start_date: add(startOfToday(), { days: 1 }),
    end_date: add(endOfToday(), { days: 2 }),
    title: "2 days event",
  },
  {
    id: "15",
    start_date: sub(startOfWeek(new Date()), { days: 2 }),
    end_date: endOfWeek(new Date()),
    title: "More than one week event",
  },
];
