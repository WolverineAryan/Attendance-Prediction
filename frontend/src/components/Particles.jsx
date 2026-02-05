import React from "react";

export default function Particles() {
  return (
    <div className="particles-container">
      {Array.from({ length: 40 }).map((_, i) => {
        const style = {
          "--x": Math.random(),
          "--i": Math.random() * 10,
        };

        return <span key={i} className="particle" style={style}></span>;
      })}
    </div>
  );
}
