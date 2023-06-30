import React, { createContext, ReactNode, useContext, useState } from "react";

import { IPlayer, IWinner } from "@/types/player";

interface Props {
  children: ReactNode;
}

interface PlayerContextProps {
  player: IPlayer;
  winner: IWinner;
  togglePlayer: () => void;
  setWinner: React.Dispatch<React.SetStateAction<IWinner>>;
  resetPlayerContext: () => void;
}

const PlayerContext = createContext({} as PlayerContextProps);

export function PlayerProvider({ children }: Props) {
  const [player, setPlayer] = useState<IPlayer>("O");
  const [winner, setWinner] = useState<IWinner>("");

  const togglePlayer = () => setPlayer(oldState => (oldState === "O" ? "X" : "O"));

  const resetPlayerContext = () => {
    setPlayer("O");
    setWinner("");
  };

  return (
    <PlayerContext.Provider value={{ player, winner, togglePlayer, setWinner, resetPlayerContext }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);

export default PlayerContext;
