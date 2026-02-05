import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim().then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        particles: {
          number: { value: 70 },
          size: { value: 3 },
          color: { value: "#22c55e" },
          links: {
            enable: true,
            color: "#22c55e",
            distance: 150,
            opacity: 0.3,
          },
          move: {
            enable: true,
            speed: 1.5,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: { distance: 120 },
            push: { quantity: 3 },
          },
        },
      }}
    />
  );
}
