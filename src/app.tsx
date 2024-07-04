import { Calendar } from "./calendar";

const App = () => {
  return (
    <div className="w-screen h-screen p-6">
      <Calendar date={new Date()} />
    </div>
  );
};

export default App;
