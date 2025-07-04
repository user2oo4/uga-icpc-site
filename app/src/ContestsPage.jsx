import React from "react";
import "./App.css";

export default function ContestsPage() {
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
          <a href="/">Home</a>
          <a href="/workshops">Workshops</a>
          <a href="/contests">Contests</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/calendar">Calendar</a>
        </nav>
      </header>
      <main className="main">
        <div className="main-content">
          <h2>Contests</h2>
          {/* Insert your contest info and summaries here. For brevity, copy from your HTML file. */}
          <p>Contest info and summaries go here.</p>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 UGA ICPC Club</p>
      </footer>
    </>
  );
}
