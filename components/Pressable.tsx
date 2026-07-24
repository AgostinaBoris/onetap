"use client";

import { useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface PressableProps {
  as?: "button" | "div" | "span";
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  activeStyle?: CSSProperties;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

/**
 * Merges base/hover/active style objects on pointer state, mirroring the
 * source app's style + style-hover + style-active authoring pattern.
 */
export function Pressable({
  as = "button",
  style,
  hoverStyle,
  activeStyle,
  onClick,
  className,
  children,
}: PressableProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const Tag = as as ElementType;

  const merged: CSSProperties = {
    ...style,
    ...(hover ? hoverStyle : null),
    ...(active ? activeStyle : null),
  };

  return (
    <Tag
      type={as === "button" ? "button" : undefined}
      className={className}
      style={merged}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {children}
    </Tag>
  );
}
