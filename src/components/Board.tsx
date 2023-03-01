import React, { useEffect, useState } from "react";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import Position from "./Position";

import { useBoard } from "@/hooks/board";
import { usePlayer } from "@/hooks/player";

export default function Board() {
  const { winner } = usePlayer();
  const { board, selectPosition } = useBoard();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 2400);
    }
  }, [loading]);

  return (
    <SimpleGrid w="600px" h="600px" columns={3} spacing={2} position="relative">
      <Box position="absolute" left="180" zIndex={1}>
        <Image alt="Left Vertical Board Line" src="../boardLeft.svg" h={600} />
      </Box>
      <Box position="absolute" right="180" zIndex={1}>
        <Image
          alt="Right Vertical Board Line"
          src="../boardRight.svg"
          h={600}
        />
      </Box>
      <Box position="absolute" top="180" zIndex={1}>
        <Image alt="Top Horizontal Board Line" src="../boardTop.svg" w={600} />
      </Box>
      <Box position="absolute" bottom="180" zIndex={1}>
        <Image
          alt="Bottom Horizontal Board Line"
          src="../boardBottom.svg"
          w={600}
        />
      </Box>
      {board.map((row, rowIndex) =>
        row.map((column, columnIndex) => (
          <Position
            key={`id${rowIndex}${columnIndex}`}
            id={`id${rowIndex}${columnIndex}`}
            disabled={loading || !!winner}
            value={column}
            onClick={() => selectPosition(rowIndex, columnIndex)}
          />
        ))
      )}
    </SimpleGrid>
  );
}
