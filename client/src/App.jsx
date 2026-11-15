import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("onboarding");

  if (currentScreen === "onboarding") {
    return (
      <Onboarding
        onGetStarted={() => setCurrentScreen("dashboard")}
      />
    );
  }

  return <Dashboard />;
}

export default App;
