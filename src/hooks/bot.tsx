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

import { ANIMATION_DURATION } from "@/utils/constants";

interface Props {
  children: ReactNode;
}

interface BotContextProps {
  bot: IPlayerOrEmpty;
  sortBot: () => void;
  setBot: React.Dispatch<React.SetStateAction<IPlayerOrEmpty>>;
}

const BotContext = createContext({} as BotContextProps);

export function BotProvider({ children }: Props) {
  const [bot, setBot] = useState<IPlayerOrEmpty>("");

  const { board, selectPosition, checkingWinner, winOrientation } = useBoard();
  const { player } = usePlayer();

  useEffect(() => {
    if (!checkingWinner && !winOrientation && player === bot) {
      console.log(checkingWinner, winOrientation, player, bot);
      setTimeout(() => sortPosition(), ANIMATION_DURATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingWinner]);

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

  return (
    <BotContext.Provider value={{ bot, setBot, sortBot }}>
      {children}
    </BotContext.Provider>
  );
}

export const useBot = () => useContext(BotContext);

export default BotContext;
