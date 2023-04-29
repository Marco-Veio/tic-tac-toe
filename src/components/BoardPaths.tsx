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
  size: number;
}

export function BoardPaths({ visible, orientation, size, delay = 0 }: Props) {
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
    Left: `M0 0C9.05548 ${120.486 * size} 3.77312 ${450.202 * size} 0 ${
      600 * size
    }`,
    Right: `M6 0C14 ${106.195 * size} 6 ${244.248 * size} 6 ${
      305.31 * size
    }C6 ${366.372 * size} 3.72529e-08 ${448.673 * size} 0 ${600 * size}`,
    Top: `M0 2.42701C${235.982 * size} 4.29138 ${252.751 * size} 3.55559 ${
      294.595 * size
    } 2.42701C504.767 -1.86843 ${564.59 * size} 0.452348 ${600 * size} 2.42701`,
    Bottom: `M0 6C${266.307 * size} 5.31529 ${545.118 * size} 3.37236 ${
      600 * size
    } 0`,
    Horizontal: `M0 0L${170.74 * size} 5L${387.781 * size} 0H${600 * size}`,
    Vertical: `M5 0L0 ${180.205 * size}L5 ${415.7 * size}V${600 * size}`,
    Diagonal1: `M0 0L${163.258 * size} ${156.25 * size}L${432.582 * size} ${
      441.667 * size
    }L${600 * size} ${600 * size}`,
    Diagonal2: `M${600 * size} 0L${386.441 * size} ${203.442 * size}L0 ${
      600 * size
    }`,
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
