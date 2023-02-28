import React, { useState } from "react";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { IPlayer } from "@/types/player";
import { IBoard } from "@/types/board";
import Square from "./Square";

export default function Board() {
  const [player, setPlayer] = useState<IPlayer>("O");
  const [board, setBoard] = useState<IBoard>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const selectSquare = (row: number, column: number) => {
    setBoard((oldState) => {
      oldState[row][column] = player;
      return oldState;
    });
    setPlayer((oldState) => (oldState === "X" ? "O" : "X"));
  };

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
          <Square
            key={`id${rowIndex}${columnIndex}`}
            id={`id${rowIndex}${columnIndex}`}
            value={column}
            onClick={() => selectSquare(rowIndex, columnIndex)}
          />
        ))
      )}
    </SimpleGrid>
  );
}
