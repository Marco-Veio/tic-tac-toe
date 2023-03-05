import { Box, Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  orientation: "Horizontal" | "Vertical" | "Diagonal1" | "Diagonal2";
  position: number;
};

export default function WinningLine({ orientation, position }: Props) {
  return (
    <Box
      position="absolute"
      top={orientation === "Horizontal" ? position * 200 + 95 : 0}
      left={orientation === "Vertical" ? position * 200 + 95 : 0}
      zIndex={1}
      display="flex"
      flexDir={orientation === "Vertical" ? "column" : "row"}
    >
      <Image
        alt={`${position} Winning Line Part 1`}
        src={`../winning${orientation}Line1.svg`}
        w={orientation === "Horizontal" ? 200 : undefined}
        h={orientation === "Vertical" ? 200 : undefined}
      />
      <Image
        alt={`${position} Winning Line Part 2`}
        src={`../winning${orientation}Line2.svg`}
        w={orientation === "Horizontal" ? 200 : undefined}
        h={orientation === "Vertical" ? 200 : undefined}
      />
      <Image
        alt={`${position} Winning Line Part 3`}
        src={`../winning${orientation}Line3.svg`}
        w={orientation === "Horizontal" ? 200 : undefined}
        h={orientation === "Vertical" ? 200 : undefined}
      />
    </Box>
  );
}
