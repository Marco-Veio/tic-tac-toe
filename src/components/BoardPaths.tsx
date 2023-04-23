import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

import { ANIMATION_DURATION } from "@/utils/constants";

interface Props {
  visible: boolean;
  orientation:
    | "Top"
    | "Bottom"
    | "Left"
    | "Right"
    | "Horizontal"
    | "Vertical"
    | "Diagonal1"
    | "Diagonal2";
  delay?: number;
}

export function BoardPaths({ visible, orientation, delay = 0 }: Props) {
  const [length, setLength] = useState<number>();
  const animatedStyle = useSpring({
    strokeDasharray: length,
    strokeDashoffset: visible ? 0 : length,
    delay,
    config: {
      duration: ANIMATION_DURATION,
    },
  });

  const d = {
    Left: "M0 0C9.05548 120.486 3.77312 450.202 0 600",
    Right:
      "M6 0C14 106.195 6 244.248 6 305.31C6 366.372 3.72529e-08 448.673 0 600",
    Top: "M0 2.42701C235.982 4.29138 252.751 3.55559 294.595 2.42701C504.767 -1.86843 564.59 0.452348 600 2.42701",
    Bottom: "M0 6C266.307 5.31529 545.118 3.37236 600 0",
    Horizontal: "M0 0L170.74 5L387.781 0H600",
    Vertical: "M5 0L0 180.205L5 415.7V600",
    Diagonal1: "M0 0L163.258 156.25L432.582 441.667L600 600",
    Diagonal2: "M600 0L386.441 203.442L0 600",
  };

  return (
    <animated.path
      style={animatedStyle}
      ref={(ref) => {
        if (ref) {
          setLength(ref.getTotalLength());
        }
      }}
      d={d[orientation]}
      stroke="black"
    />
  );
}
