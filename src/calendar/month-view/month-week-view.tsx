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
    <div className="w-full h-full relative">
      <div className="w-full h-full flex">
        {week.map((day) => {
          const isStartOfMonth = isSameDay(day, startOfMonth(day));

          const variant = isToday(day) ? "today" : "default";
          const size = isStartOfMonth ? "startOfMonth" : "default";
          const text = isStartOfMonth
            ? format(day, "d, MMM")
            : format(day, "d");

          const className = cn(dayLabelVariants({ variant, size }));

          return (
            <div
              key={"day-label-" + day.toISOString()}
              className="flex-1 flex flex-col items-center border-b border-l last:border-r"
            >
              <h2 className={className}>{text}</h2>
            </div>
          );
        })}
      </div>
      <div className="my-8 absolute inset-0 space-y-1 overflow-hidden">
        <div className="h-6 bg-blue-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
            deleniti, laudantium, voluptatibus vel fugit in nostrum rerum
            possimus id ut, molestiae non sit sunt! Optio labore ad magni eum
            facere.
          </h1>
        </div>

        <div className="h-6 bg-blue-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
            deleniti, laudantium, voluptatibus vel fugit in nostrum rerum
            possimus id ut, molestiae non sit sunt! Optio labore ad magni eum
            facere.
          </h1>
        </div>

        <div className="h-6 bg-blue-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
            deleniti, laudantium, voluptatibus vel fugit in nostrum rerum
            possimus id ut, molestiae non sit sunt! Optio labore ad magni eum
            facere.
          </h1>
        </div>

        <div className="h-6 bg-blue-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
            deleniti, laudantium, voluptatibus vel fugit in nostrum rerum
            possimus id ut, molestiae non sit sunt! Optio labore ad magni eum
            facere.
          </h1>
        </div>

        <div className="h-6 bg-blue-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
            deleniti, laudantium, voluptatibus vel fugit in nostrum rerum
            possimus id ut, molestiae non sit sunt! Optio labore ad magni eum
            facere.
          </h1>
        </div>

        <div className="h-6 flex">
          {week.map((day) => {
            return (
              <div
                className="pl-4 pr-6 flex-1 flex flex-col"
                key={day.toISOString()}
              >
                <h2>7 more</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
