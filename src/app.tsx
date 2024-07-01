import { Calendar } from "./calendar";

const App = () => {
  return (
    <div className="w-full h-full p-6">
      <Calendar date={new Date()} />
    </div>
  );
};

export default App;
