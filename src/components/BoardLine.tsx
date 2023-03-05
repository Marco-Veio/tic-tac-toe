import { Box, Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  position: "Bottom" | "Top" | "Left" | "Right";
};

export default function BoardLine({ position }: Props) {
  return (
    <Box
      position="absolute"
      left={position === "Left" ? 195 : undefined}
      right={position === "Right" ? 195 : undefined}
      top={position === "Top" ? 195 : undefined}
      bottom={position === "Bottom" ? 195 : undefined}
      zIndex={1}
      display="flex"
      flexDir={position === "Bottom" || position === "Top" ? "row" : "column"}
    >
      <Image
        alt={`${position} Vertical Board Line Part 1`}
        src={`../board${position}1.svg`}
        w={position === "Bottom" || position === "Top" ? 200 : undefined}
        h={position === "Bottom" || position === "Top" ? undefined : 200}
      />
      <Image
        alt={`${position} Vertical Board Line Part 2`}
        src={`../board${position}2.svg`}
        w={position === "Bottom" || position === "Top" ? 200 : undefined}
        h={position === "Bottom" || position === "Top" ? undefined : 200}
      />
      <Image
        alt={`${position} Vertical Board Line Part 3`}
        src={`../board${position}3.svg`}
        w={position === "Bottom" || position === "Top" ? 200 : undefined}
        h={position === "Bottom" || position === "Top" ? undefined : 200}
      />
    </Box>
  );
}
