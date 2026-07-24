import type { CSSProperties, ReactNode } from "react";
import { Pressable } from "./Pressable";

export function CTAButton({
  onClick,
  children,
  style,
}: {
  onClick: () => void;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <Pressable
      onClick={onClick}
      style={{
        width: "100%",
        height: 58,
        border: "none",
        borderRadius: 16,
        background: "linear-gradient(150deg,#3390FD,#2563EB)",
        color: "#fff",
        fontFamily: "Instrument Sans, sans-serif",
        fontWeight: 600,
        fontSize: 17,
        cursor: "pointer",
        boxShadow: "0 14px 30px -6px rgba(37,99,235,.6)",
        transition: "transform .18s,box-shadow .25s",
        animation: "ctaGlow 3.4s ease-in-out infinite",
        ...style,
      }}
      hoverStyle={{
        transform: "translateY(-2px)",
        boxShadow: "0 22px 46px -8px rgba(37,99,235,.95)",
      }}
      activeStyle={{ transform: "scale(.97)" }}
    >
      {children}
    </Pressable>
  );
}
