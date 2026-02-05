import React from "react";

export default function AnimatedBackground() {
  return (
    <>
      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Waves */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
    </>
  );
}
