import type { Event } from "../types";

type AllDayEventProps = {
  event: Event;
};

export const AllDayEvent: React.FC<AllDayEventProps> = ({ event }) => {
  return (
    <div className="w-full py-1 px-2 cursor-pointer bg-blue-400 rounded">
      <h1 className="text-xs text-white">{event.title}</h1>
    </div>
  );
};
