import React, { useEffect, useMemo, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
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
  const [bk, setBk] = useState(0);
  const size = useBreakpointValue({ base: 0.5, md: 1 }, { fallback: "md" });

  useEffect(() => setBk((oldState) => ++oldState), [size]);

  const lineDefinitions = useMemo(() => {
    if (bk > 1 && size) {
      return {
        Left: {
          left: 200 * size - 5,
          right: undefined,
          top: undefined,
          bottom: undefined,
          width: 5,
          height: 600 * size,
          viewBox: `0 0 5 ${600 * size}`,
          transform: [
            `translate(0 ${400 * size})`,
            `translate(0 ${200 * size})`,
            undefined,
          ],
          rectWidth: 5,
          rectHeight: 200 * size,
        },
        Right: {
          left: undefined,
          right: 200 * size - 5,
          top: undefined,
          bottom: undefined,
          width: 10,
          height: 600 * size,
          viewBox: `0 0 10 ${600 * size}`,
          transform: [
            `translate(0 ${400 * size})`,
            `translate(0 ${200 * size})`,
            undefined,
          ],
          rectWidth: 9.55556,
          rectHeight: 200 * size,
        },
        Top: {
          left: undefined,
          right: undefined,
          top: 200 * size - 5,
          bottom: undefined,
          width: 600 * size,
          height: 6,
          viewBox: `0 0 ${600 * size} 6`,
          transform: [
            `translate(${200 * size})`,
            `translate(${400 * size})`,
            undefined,
          ],
          rectWidth: 200 * size,
          rectHeight: 6,
        },
        Bottom: {
          left: undefined,
          right: undefined,
          top: undefined,
          bottom: 200 * size - 5,
          width: 600 * size,
          height: 6,
          viewBox: `0 0 ${600 * size} 6`,
          transform: [
            `translate(${200 * size})`,
            `translate(${400 * size})`,
            undefined,
          ],
          rectWidth: 200 * size,
          rectHeight: 6,
        },
        Horizontal: {
          left: 0,
          right: undefined,
          top: (position * 200 + 100) * size - 5,
          bottom: undefined,
          width: 600 * size,
          height: 5,
          viewBox: `0 0 ${600 * size} 5`,
          transform: [
            `translate(${400 * size})`,
            `translate(${200 * size})`,
            undefined,
          ],
          rectWidth: 200 * size,
          rectHeight: 5,
        },
        Vertical: {
          left: (position * 200 + 100) * size - 5,
          right: undefined,
          top: 0,
          bottom: undefined,
          width: 5,
          height: 600 * size,
          viewBox: `0 0 5 ${600 * size}`,
          transform: [
            `translate(0 ${400 * size})`,
            `translate(0 ${200 * size})`,
            undefined,
          ],
          rectWidth: 5,
          rectHeight: 200 * size,
        },
        Diagonal1: {
          left: 0,
          right: undefined,
          top: 0,
          bottom: undefined,
          width: 600 * size,
          height: 600 * size,
          viewBox: `0 0 ${600 * size} ${600 * size}`,
          transform: [
            `translate(${400 * size})`,
            `translate(${200 * size})`,
            undefined,
          ],
          rectWidth: 200 * size,
          rectHeight: 600 * size,
        },
        Diagonal2: {
          left: 0,
          right: undefined,
          top: 0,
          bottom: undefined,
          width: 600 * size,
          height: 600 * size,
          viewBox: `0 0 ${600 * size} ${600 * size}`,
          transform: [
            `translate(${400 * size})`,
            undefined,
            `translate(${200 * size})`,
          ],
          rectWidth: 200 * size,
          rectHeight: 600 * size,
        },
      };
    }
    return null;
  }, [bk]);

  if (lineDefinitions && size) {
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
              size={size}
              orientation={orientation}
              visible={visible}
              delay={delay}
            />
          </g>
          <g clipPath={`url(#clip1_0_1_${orientation})`}>
            <BoardPaths
              size={size}
              orientation={orientation}
              visible={visible}
              delay={delay}
            />
          </g>
          <g clipPath={`url(#clip2_0_1_${orientation})`}>
            <BoardPaths
              size={size}
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
  return <></>;
}
