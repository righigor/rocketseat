import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
// import { EmptyGoals } from "./components/empty-goals";
import { Dialog } from "./components/ui/dialog";

function App() {
  return (
    <div className="bg-zinc-950 text-zinc-50 antialiased h-screen">
      <Dialog>
        {/* <EmptyGoals /> */}
        <Summary />
        <CreateGoal />
      </Dialog>
    </div>
  );
}

export default App;
