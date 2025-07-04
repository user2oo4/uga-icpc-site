import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import WorkshopsPage from "./WorkshopsPage";
import ContestsPage from "./ContestsPage";
import LeaderboardPage from "./LeaderboardPage";
import MarkdownDynamicPage from "./MarkdownDynamicPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/notes/:mdfile" element={<MarkdownDynamicPage />} />
      </Routes>
    </Router>
  );
}

export default App;