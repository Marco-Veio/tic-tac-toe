import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Position from "./Position";

import { useBoard } from "@/hooks/board";
import { usePlayer } from "@/hooks/player";
import BoardLine from "./BoardLine";
import WinningLine from "./WinningLine";

export default function Board() {
  const { winner } = usePlayer();
  const { board, winPosition, winOrientation, selectPosition } = useBoard();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 2400);
    }
  }, [loading]);

  return (
    <SimpleGrid w="600px" h="600px" columns={3} spacing={2} position="relative">
      <BoardLine position="Left" />
      <BoardLine position="Right" />
      <BoardLine position="Top" />
      <BoardLine position="Bottom" />
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
      {winOrientation && winner !== "Draw" && (
        <WinningLine orientation={winOrientation} position={winPosition} />
      )}
    </SimpleGrid>
  );
}
