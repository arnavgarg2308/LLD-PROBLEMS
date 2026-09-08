import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProblemDetails from "./pages/ProblemDetails";
import Workspace from "./pages/Workspace";
import Feedback from "./pages/Feedback";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        <Route path="/workspace/:id" element={<Workspace />} />
        <Route path="/feedback/:attemptId" element={<Feedback />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;