import { useEffect } from "react";

export default function useParallax(ref) {
  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      if (ref.current) {
        ref.current.style.transform =
          `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [ref]);
}
