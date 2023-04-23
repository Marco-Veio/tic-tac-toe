import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBoard } from "./board";
import { usePlayer } from "./player";

import { IPlayerOrEmpty } from "@/types/board";
import { IModeOrEmpty } from "@/types/mode";

import { ANIMATION_DURATION } from "@/utils/constants";

interface Props {
  children: ReactNode;
}

interface BotContextProps {
  bot: IPlayerOrEmpty;
  sortBot: () => void;
  setBot: React.Dispatch<React.SetStateAction<IPlayerOrEmpty>>;
  setMode: React.Dispatch<React.SetStateAction<IModeOrEmpty>>;
}

const BotContext = createContext({} as BotContextProps);

export function BotProvider({ children }: Props) {
  const [bot, setBot] = useState<IPlayerOrEmpty>("");
  const [mode, setMode] = useState<IModeOrEmpty>("");

  const { board, selectPosition, checkingWinner, moves } = useBoard();
  const { player, winner } = usePlayer();

  useEffect(() => {
    if (!checkingWinner && !winner && player === bot) {
      setTimeout(() => botMove(), ANIMATION_DURATION);
    }
  }, [checkingWinner]);

  const botMove = () => {
    if (mode !== "easy") {
      const position = checkIfMissingOneMoveToWin();
      if (position) {
        selectPosition(position[0], position[1]);
        return;
      }

      if (mode !== "medium") {
        let goodPositions = [
          [0, 0],
          [0, 2],
          [2, 0],
          [2, 2],
        ];

        if (mode === "impossible") {
          if (moves === 1 && !board[1][1]) {
            selectPosition(1, 1);
            return;
          }

          let playerGoodPositions = 0;
          for (const goodPosition of goodPositions) {
            if (board[goodPosition[0]][goodPosition[1]] === "O") {
              playerGoodPositions++;
            }
            if (moves === 3 && playerGoodPositions > 1 && board[1][1] === bot) {
              goodPositions = [
                [0, 1],
                [1, 0],
                [1, 2],
                [2, 1],
              ];
              break;
            }
          }
        }

        const freeGoodPositions = [] as number[][];
        for (const goodPosition of goodPositions) {
          if (!board[goodPosition[0]][goodPosition[1]]) {
            freeGoodPositions.push(goodPosition);
          }
        }

        if (freeGoodPositions.length) {
          for (const freeGoodPosition of freeGoodPositions) {
            const row = freeGoodPosition[0] ? 0 : 2;
            const column = freeGoodPosition[1] ? 0 : 2;

            if (board[row][column]) {
              selectPosition(freeGoodPosition[0], freeGoodPosition[1]);
              return;
            }
          }

          const position = sort(0, freeGoodPositions.length - 1);
          selectPosition(
            freeGoodPositions[position][0],
            freeGoodPositions[position][1]
          );
          return;
        }
      }
    }
    sortPosition();
  };

  const sort = (min = 0, max = 2) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const sortPosition = () => {
    let row = sort();
    let column = sort();

    while (!!board[row][column]) {
      row = sort();
      column = sort();
    }

    selectPosition(row, column);
  };

  const sortBot = () => {
    const sortedBot = sort(0, 1);
    setBot(sortedBot ? "O" : "X");
    if (sortedBot) {
      botMove();
    }
  };

  const checkIfMissingOneMoveToWin = () => {
    const getLosingPosition = (index: number, emptyIndex: number) => {
      switch (true) {
        case index < 3:
          return [index, emptyIndex];
        case index < 6:
          return [emptyIndex, index - 3];
        case index === 6:
          return [emptyIndex, emptyIndex];
        case index === 7:
          return [emptyIndex, 2 - emptyIndex];
      }
    };

    const possibilities = [
      ...board,
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    let losingPosition = null;

    for (const [index, possibility] of possibilities.entries()) {
      const emptyIndex = possibility.indexOf("");

      if (
        possibility.filter((p) => p === bot).length === 2 &&
        emptyIndex !== -1
      ) {
        return getLosingPosition(index, emptyIndex);
      } else if (
        possibility.filter((p) => p !== bot && p !== "").length === 2 &&
        emptyIndex !== -1
      ) {
        losingPosition = getLosingPosition(index, emptyIndex);
      }
    }

    return losingPosition;
  };

  return (
    <BotContext.Provider value={{ bot, setBot, sortBot, setMode }}>
      {children}
    </BotContext.Provider>
  );
}

export const useBot = () => useContext(BotContext);

export default BotContext;
