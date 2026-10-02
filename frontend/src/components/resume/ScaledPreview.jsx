import { useEffect, useRef, useState } from "react";
import RenderResume from "./RenderResume";

// Scales a full-width A4 resume down to fit a container width.
const A4_WIDTH = 794;

export default function ScaledPreview({ templateId, resumeData, maxWidth }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      const w = maxWidth || ref.current?.parentElement?.clientWidth || 400;
      setScale(Math.min(w / A4_WIDTH, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [maxWidth]);

  return (
    <div ref={ref} style={{ width: A4_WIDTH * scale, height: 1123 * scale }} className="mx-auto overflow-hidden rounded-xl shadow-soft">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: A4_WIDTH }}>
        <RenderResume templateId={templateId} resumeData={resumeData} />
      </div>
    </div>
  );
}
