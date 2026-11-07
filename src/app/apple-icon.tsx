import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          border: "6px solid #8781ff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#3cd7ff",
            boxShadow: "0 0 20px #3cd7ff",
          }}
        />
        <span
          style={{
            fontSize: 92,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(135deg, #c4c0ff 0%, #a2e7ff 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-2px",
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
