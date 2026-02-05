import React, { useMemo } from "react";

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      style: {
        "--x": Math.random(),
        "--i": Math.random() * 10,
      },
    }));
  }, []); // <-- important: runs only ONCE

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={p.style}
        ></span>
      ))}
    </div>
  );
}

export default React.memo(Particles);
