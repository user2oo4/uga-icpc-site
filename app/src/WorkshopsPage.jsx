import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const workshops = [
  { week: 1, label: "Time Complexity", md: "complexity" },
  { week: 2, label: "Brute Force + Set/Map (optional)", md: "brute" },
  { week: 3, label: "Greedy Problems", md: "greedy" },
  { week: 4, label: "Graph (DFS, BFS, Shortest Path)", md: "graph" },
  { week: 5, label: "DP 1 (Basic 1D + Table DP)", md: "dp_1" },
  { week: 6, label: "Binary Search", md: "binarysearch" },
  { week: 7, label: "Prefix Sums", md: "prefix_sum" },
  { week: 8, label: "2 pointers, sliding window", md: "sliding_window" },
  { week: 9, label: "DP on Tree", md: "dp_tree" },
  { week: 10, label: "DSU, MST", md: "dsu_mst" },
  { week: 11, label: "Math", md: "math" },
  // Add more as needed
];

export default function WorkshopsPage() {
  return (
    <>
      <header className="header">
        <h1>
          <img
            src="https://acm-uga.github.io/resources/social_img/csip.png"
            alt="UGA ICPC Logo"
            className="logo"
          />
          UGA ICPC Club
        </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/contests">Contests</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/calendar">Calendar</Link>
        </nav>
      </header>
      <main className="main">
        <div className="main-content">
          <h2>Workshops</h2>
          <ul className="workshop-list">
            {workshops.map((w) => (
              <li key={w.week}>
                <Link to={`/notes/${w.md}`}>{`Week ${w.week}: ${w.label}`}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 UGA ICPC Club</p>
      </footer>
    </>
  );
}
