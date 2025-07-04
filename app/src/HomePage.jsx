import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function HomePage() {
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
          <h2>Welcome!</h2>
          <p>
            This is the official site for the UGA ICPC Club. Here you'll
            find workshop materials, contest info, leaderboards, and
            more.
          </p>
          <ul>
            <li>Weekly workshops and slides</li>
            <li>Mock contests and solutions</li>
            <li>Points leaderboard</li>
            <li>Event calendar</li>
          </ul>
          <section>
            <h3>Workshops</h3>
            <p>
              Workshop content coming soon! Check back for slides,
              problems, and practice links.
            </p>
          </section>
          <section>
            <h3>Contests</h3>
            <p>
              Contest summaries, problems, and solutions will be
              posted here.
            </p>
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 UGA ICPC Club</p>
      </footer>
    </>
  );
}
