import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #131318 0%, #1c1a35 100%)",
          borderRadius: 8,
          border: "1.5px solid #8781ff",
          boxShadow: "0 0 10px rgba(135,129,255,0.4)",
          position: "relative",
        }}
      >
        {/* Glowing dot */}
        <div
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#3cd7ff",
            boxShadow: "0 0 6px #3cd7ff",
          }}
        />
        {/* Monogram */}
        <span
          style={{
            fontSize: 16,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(135deg, #c4c0ff 0%, #a2e7ff 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          JA
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
