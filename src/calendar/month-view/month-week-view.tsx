import { cn } from "../../utils";
import { cva } from "class-variance-authority";
import { format, isToday, isSameDay, startOfMonth } from "date-fns";

type MonthWeekViewProps = {
  week: Date[];
  events?: Event[];
};

const dayLabelVariants = cva(
  "my-2 flex justify-center items-center text-sm font-semibold",
  {
    variants: {
      variant: {
        default: "bg-transparent text-gray-500",
        today: "bg-blue-400 text-white",
      },
      size: {
        default: "w-6 h-6 rounded-full",
        startOfMonth: "px-2 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const MonthWeekView: React.FC<MonthWeekViewProps> = ({
  week,
  // events = [],
}) => {
  return (
    <div className="w-full h-full flex">
      {week.map((day) => {
        const isStartOfMonth = isSameDay(day, startOfMonth(day));

        const variant = isToday(day) ? "today" : "default";
        const size = isStartOfMonth ? "startOfMonth" : "default";
        const text = isStartOfMonth ? format(day, "d, MMM") : format(day, "d");

        const className = cn(dayLabelVariants({ variant, size }));

        return (
          <div className="flex-1 flex flex-col items-center border-b border-l last:border-r">
            <h2 className={className}>{text}</h2>
          </div>
        );
      })}
    </div>
  );
};
