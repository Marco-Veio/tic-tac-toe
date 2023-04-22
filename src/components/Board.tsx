import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Position from "@/components/Position";
import BoardLine from "@/components/BoardLine";

import { useRouter } from "next/router";
import { useBoard } from "@/hooks/board";
import { usePlayer } from "@/hooks/player";
import { useBot } from "@/hooks/bot";

import { ANIMATION_DURATION } from "@/utils/constants";
import { IMode } from "@/types/mode";

export default function Board() {
  const router = useRouter();
  const { player, winner } = usePlayer();
  const { board, winPosition, winOrientation, selectPosition } = useBoard();
  const { bot, sortBot, setMode } = useBot();
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [startWin, setStartWin] = useState(false);

  const { mode } = router.query;

  useEffect(() => {
    setMode(mode as IMode);
    setTimeout(() => setStart(true), 0);
  }, []);

  useEffect(() => {
    if (loading && start) {
      setTimeout(() => {
        setLoading(false);
        if (mode !== "pvp") {
          sortBot();
        }
      }, ANIMATION_DURATION * 4);
    }
  }, [loading, mode, start]);

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
            disabled={loading || !!winner || player === bot}
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
