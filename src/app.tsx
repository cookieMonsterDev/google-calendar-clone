import { Calendar } from "./calendar";
import { eventsMock } from "./events-mock";

const App = () => {
  return (
    <div className="w-screen h-screen p-6">
      <Calendar date={new Date()} events={eventsMock} />
    </div>
  );
};

export default App;
