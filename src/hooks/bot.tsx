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

  const { board, selectPosition, checkingWinner, winOrientation } = useBoard();
  const { player } = usePlayer();

  useEffect(() => {
    if (!checkingWinner && !winOrientation && player === bot) {
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
      sortPosition();
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
