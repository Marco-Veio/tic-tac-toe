import React from "react";
import { Box } from "@chakra-ui/react";
import { BoardPaths } from "./BoardPaths";

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
  position?: number;
}

export default function BoardLine({
  visible,
  orientation,
  delay,
  position = 0,
}: Props) {
  const lineDefinitions = {
    Left: {
      left: 195,
      right: undefined,
      top: undefined,
      bottom: undefined,
      width: 5,
      height: 600,
      viewBox: "0 0 5 600",
      transform: ["translate(0 400)", "translate(0 200)", undefined],
      rectWidth: 5,
      rectHeight: 200,
    },
    Right: {
      left: undefined,
      right: 195,
      top: undefined,
      bottom: undefined,
      width: 10,
      height: 600,
      viewBox: "0 0 10 600",
      transform: ["translate(0 400)", "translate(0 200)", undefined],
      rectWidth: 9.55556,
      rectHeight: 200,
    },
    Top: {
      left: undefined,
      right: undefined,
      top: 195,
      bottom: undefined,
      width: 600,
      height: 6,
      viewBox: "0 0 600 6",
      transform: ["translate(200)", "translate(400)", undefined],
      rectWidth: 200,
      rectHeight: 6,
    },
    Bottom: {
      left: undefined,
      right: undefined,
      top: undefined,
      bottom: 195,
      width: 600,
      height: 6,
      viewBox: "0 0 600 6",
      transform: ["translate(200)", "translate(400)", undefined],
      rectWidth: 200,
      rectHeight: 6,
    },
    Horizontal: {
      left: 0,
      right: undefined,
      top: position * 200 + 95,
      bottom: undefined,
      width: 600,
      height: 5,
      viewBox: "0 0 600 5",
      transform: ["translate(400)", "translate(200)", undefined],
      rectWidth: 200,
      rectHeight: 5,
    },
    Vertical: {
      left: position * 200 + 95,
      right: undefined,
      top: 0,
      bottom: undefined,
      width: 5,
      height: 600,
      viewBox: "0 0 5 600",
      transform: ["translate(0 400)", "translate(0 200)", undefined],
      rectWidth: 5,
      rectHeight: 200,
    },
    Diagonal1: {
      left: 0,
      right: undefined,
      top: 0,
      bottom: undefined,
      width: 600,
      height: 600,
      viewBox: "0 0 600 600",
      transform: ["translate(400)", "translate(200)", undefined],
      rectWidth: 200,
      rectHeight: 600,
    },
    Diagonal2: {
      left: 0,
      right: undefined,
      top: 0,
      bottom: undefined,
      width: 600,
      height: 600,
      viewBox: "0 0 600 600",
      transform: ["translate(400)", undefined, "translate(200)"],
      rectWidth: 200,
      rectHeight: 600,
    },
  };

  return (
    <Box
      position="absolute"
      left={lineDefinitions[orientation].left}
      right={lineDefinitions[orientation].right}
      top={lineDefinitions[orientation].top}
      bottom={lineDefinitions[orientation].bottom}
      zIndex={1}
    >
      <svg
        width={lineDefinitions[orientation].width}
        height={lineDefinitions[orientation].height}
        viewBox={lineDefinitions[orientation].viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath={`url(#clip0_0_1_${orientation})`}>
          <BoardPaths
            orientation={orientation}
            visible={visible}
            delay={delay}
          />
        </g>
        <g clipPath={`url(#clip1_0_1_${orientation})`}>
          <BoardPaths
            orientation={orientation}
            visible={visible}
            delay={delay}
          />
        </g>
        <g clipPath={`url(#clip2_0_1_${orientation})`}>
          <BoardPaths
            orientation={orientation}
            visible={visible}
            delay={delay}
          />
        </g>
        <defs>
          <clipPath id={`clip0_0_1_${orientation}`}>
            <rect
              width={lineDefinitions[orientation].rectWidth}
              height={lineDefinitions[orientation].rectHeight}
              fill="white"
              transform={lineDefinitions[orientation].transform[0]}
            />
          </clipPath>
          <clipPath id={`clip1_0_1_${orientation}`}>
            <rect
              width={lineDefinitions[orientation].rectWidth}
              height={lineDefinitions[orientation].rectHeight}
              fill="white"
              transform={lineDefinitions[orientation].transform[1]}
            />
          </clipPath>
          <clipPath id={`clip2_0_1_${orientation}`}>
            <rect
              width={lineDefinitions[orientation].rectWidth}
              height={lineDefinitions[orientation].rectHeight}
              fill="white"
              transform={lineDefinitions[orientation].transform[2]}
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
