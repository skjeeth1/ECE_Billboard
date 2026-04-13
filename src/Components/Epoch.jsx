import React, { useState, useRef } from "react";
import "../Styles/Epoch.css";

import Epoch1 from "../Epoch1.jpeg";
import Epoch2 from "../Epoch1.jpeg";
import Epoch3 from "../Epoch1.jpeg";
import Epoch4 from "../Epoch1.jpeg";
import Epoch5 from "../Epoch1.jpeg";

const EPOCHS = [
  { img: Epoch1, name: "Epoch I",   tag: "Session 1" },
  { img: Epoch2, name: "Epoch II",  tag: "Session 2" },
  { img: Epoch3, name: "Epoch III", tag: "Session 3" },
  { img: Epoch4, name: "Epoch IV",  tag: "Session 4" },
  { img: Epoch5, name: "Epoch V",   tag: "Session 5" },
];

const ACTIVITIES = [
  { icon: "📋", title: "Bi-weekly Exams",
    body: "1-hour placement-oriented tests covering Aptitude, Core, ECE and GK via VIA" },
  { icon: "⚙️", title: "C2S Training",
    body: "Guided, industry-grade project development from concept to solution" },
  { icon: "🎤", title: "Mock Interviews & Group Discussions",
    body: "Simulated rounds with structured feedback from faculty and peers" },
  { icon: "⭐", title: "Placement Talks",
    body: "Perspective sessions by seniors placed in top companies" },
  { icon: "🏭", title: "Industrial Training & Visits",
    body: "Hands-on exposure to real-world engineering environments" },
  { icon: "🖥️", title: "ECE Billboard Integration",
    body: "All resources, updates and performance tracking unified on this platform" },
];

const latest  = EPOCHS[0];
const older   = EPOCHS.slice(1);
const PER_PAGE = 3;

function Epoch() {
  const [page, setPage] = useState(0);
  const trackRef = useRef(null);
  const totalPages = Math.ceil(older.length / PER_PAGE);

  const goTo = (p) => {
    const next = (p + totalPages) % totalPages;
    setPage(next);
    if (trackRef.current) {
      const cardW = (trackRef.current.querySelector(".epoch-old-card")?.offsetWidth ?? 0) + 16;
      trackRef.current.style.transform = `translateX(-${next * PER_PAGE * cardW}px)`;
    }
  };

  return (
    <div className="epoch-wrap">
      <h1 className="epoch-title">EPOCH</h1>
      <p className="epoch-subtitle">Electronics Placement &amp; Outcome Competency Hub</p>

      {/* ── Featured row ── */}
      <div className="epoch-featured">

        {/* Left: info card */}
        <div className="epoch-feat-content">
          <div className="epoch-feat-header">
            <span className="epoch-tag">{latest.tag}</span>
            <h2 className="epoch-feat-name">{latest.name}</h2>
          </div>
          <p className="epoch-feat-lead">
            A structured Placement &amp; Skill Development bench constituted with faculty
            advisors and student coordinators to design, conduct and monitor holistic
            placement readiness across the department.
          </p>
          <hr className="epoch-feat-divider" />
          <ul className="epoch-feat-list">
            {ACTIVITIES.map((item) => (
              <li key={item.title}>
                <div className="epoch-list-icon">{item.icon}</div>
                <div className="epoch-list-text">
                  <span className="epoch-list-title">{item.title}</span>
                  <span className="epoch-list-body">{item.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: full poster image */}
        <div className="epoch-feat-img">
          <div className="epoch-feat-img-top">
            <img src={latest.img} alt={latest.name} />
          </div>
          <div className="epoch-feat-img-label">
            <div className="epoch-feat-img-label-dot" />
            <span>{latest.name} · {latest.tag}</span>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="epoch-carousel">
        <div className="epoch-track-wrap">
          <div className="epoch-track" ref={trackRef}>
            {older.map((epoch) => (
              <div key={epoch.name} className="epoch-old-card">
                <div className="epoch-old-img-wrap">
                  <div className="epoch-card-img-top">
                    <img src={epoch.img} alt={epoch.name} />
                  </div>
                </div>
                <div className="epoch-old-info">
                  <div className="epoch-old-name">{epoch.name}</div>
                  <div className="epoch-old-tag">{epoch.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="epoch-nav">
          <button className="epoch-nav-btn" onClick={() => goTo(page - 1)} aria-label="Previous">‹</button>
          <div className="epoch-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`epoch-dot${i === page ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button className="epoch-nav-btn" onClick={() => goTo(page + 1)} aria-label="Next">›</button>
        </div>
      </div>
    </div>
  );
}

export default Epoch;
