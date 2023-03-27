import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Position from "@/components/Position";
import BoardLine from "@/components/BoardLine";

import { useBoard } from "@/hooks/board";
import { usePlayer } from "@/hooks/player";

import { ANIMATION_DURATION } from "@/utils/constants";

export default function Board() {
  const { winner } = usePlayer();
  const { board, winPosition, winOrientation, selectPosition } = useBoard();
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [startWin, setStartWin] = useState(false);

  useEffect(() => {
    setTimeout(() => setStart(true), 0);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), ANIMATION_DURATION * 4);
    }
  }, [loading]);

  useEffect(() => {
    if (!!winOrientation) {
      setTimeout(() => setStartWin(true), ANIMATION_DURATION);
    }
  }, [winOrientation]);

  return (
    <SimpleGrid w="600px" h="600px" columns={3} spacing={2} position="relative">
      <BoardLine visible={start} orientation="Left" />
      <BoardLine
        visible={start}
        orientation="Right"
        delay={ANIMATION_DURATION}
      />
      <BoardLine
        visible={start}
        orientation="Top"
        delay={ANIMATION_DURATION * 2}
      />
      <BoardLine
        visible={start}
        orientation="Bottom"
        delay={ANIMATION_DURATION * 3}
      />
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
        <BoardLine
          visible={startWin}
          orientation={winOrientation}
          position={winPosition}
        />
      )}
    </SimpleGrid>
  );
}
