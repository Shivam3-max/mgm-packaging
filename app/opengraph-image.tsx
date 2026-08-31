import { ImageResponse } from "next/og";
import { SITE } from "@/data/company";

export const alt = `${SITE.name} — LLDPE polybags, Barotiwala, Baddi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #01173C 0%, #062B6B 55%, #0A3E8C 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              marginRight: 20,
              border: "5px solid #85B53D",
              borderTop: "none",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 8,
            }}
          >
            MGM PACKAGING
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 800 }}>
            Packaging today.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 800,
              color: "#9ED45B",
              marginBottom: 26,
            }}
          >
            Protecting tomorrow.
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#B8C6DE", maxWidth: 940 }}>
            LLDPE polybags — plain, printed, zip lock, gusset and coloured — made
            inside the Baddi industrial belt. 15–200 micron, any size.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            color: "#9ED45B",
          }}
        >
          BAROTIWALA · BADDI · HIMACHAL PRADESH
        </div>
      </div>
    ),
    { ...size }
  );
}
