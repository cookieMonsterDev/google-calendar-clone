import { add, sub, endOfToday, startOfToday } from "date-fns";

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
    id: "6",
    start_date: startOfToday(),
    end_date: add(endOfToday(), { seconds: 1 }),
    title: "All day event",
  },
  {
    id: "9",
    start_date: add(startOfToday(), { days: 1, hours: 1 }),
    end_date: add(startOfToday(), { days: 1, hours: 1, minutes: 30 }),
    title: "Tomorrow event",
  },
  {
    id: "10",
    start_date: sub(startOfToday(), { hours: 12 }),
    end_date: sub(startOfToday(), { hours: 11 }),
    title: "Yesterday event",
  },
  {
    id: "11",
    start_date: sub(startOfToday(), { days: 2, hours: 4 }),
    end_date: add(endOfToday(), { days: 1, minutes: 30 }),
    title: "Week event",
  },
];
