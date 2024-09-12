import { useState } from "react";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
// import { EmptyGoals } from "./components/empty-goals";
import { Dialog } from "./components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  return (
    <div>
      <Dialog>
        {/* <EmptyGoals /> */}
        <Summary />
        <CreateGoal />
      </Dialog>
    </div>
  );
}

export default App;
