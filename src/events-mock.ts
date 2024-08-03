import {
  add,
  sub,
  endOfWeek,
  endOfMonth,
  endOfToday,
  startOfWeek,
  startOfToday,
  startOfMonth,
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
    title: "Tomorrow event 1",
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
    title: "All day event 1",
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
  {
    id: "16",
    start_date: startOfMonth(new Date()),
    end_date: endOfMonth(new Date()),
    title: "Month event",
  },
  {
    id: "17",
    start_date: startOfToday(),
    end_date: endOfToday(),
    title: "All day event 2",
  },

  {
    id: "18",
    start_date: startOfToday(),
    end_date: endOfToday(),
    title: "All day event 3",
  },

  {
    id: "19",
    start_date: add(startOfToday(), { days: 1, hours: 6 }),
    end_date: add(startOfToday(), { days: 1, hours: 6, minutes: 30 }),
    title: "Tomorrow event 2",
  },
  {
    id: "20",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 1",
  },
  {
    id: "21",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 2",
  },
  {
    id: "22",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 3",
  },
  {
    id: "23",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 4",
  },
  {
    id: "24",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 5",
  },
  {
    id: "25",
    start_date: add(startOfToday(), { days: 7 }),
    end_date: add(startOfToday(), { days: 7 }),
    title: "Next week 6",
  },
];
