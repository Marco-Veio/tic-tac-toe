import { IBoard } from "@/types/board";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePlayer } from "./player";

type Props = { children: ReactNode };

type BoardContextProps = {
  board: IBoard;
  selectPosition: (row: number, column: number) => void;
  resetBoardContext: () => void;
};

const BoardContext = createContext({} as BoardContextProps);

export function BoardProvider({ children }: Props) {
  const { player, togglePlayer, setWinner, resetPlayerContext } = usePlayer();
  const [board, setBoard] = useState<IBoard>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [moves, setMoves] = useState(0);

  const selectPosition = (row: number, column: number) => {
    setBoard((oldState) => {
      oldState[row][column] = player;
      return oldState;
    });
    setMoves((oldState) => ++oldState);
    togglePlayer();
  };

  const resetBoardContext = () => {
    resetPlayerContext();
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setMoves(0);
  };

  useEffect(() => {
    if (
      (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      setWinner(board[1][1]);
    } else {
      for (const index in board) {
        if (
          board[index][0] !== "" &&
          board[index][0] === board[index][1] &&
          board[index][1] === board[index][2]
        ) {
          setWinner(board[index][0]);
          return;
        }
        if (
          board[0][index] !== "" &&
          board[0][index] === board[1][index] &&
          board[1][index] === board[2][index]
        ) {
          setWinner(board[0][index]);
          return;
        }
      }
      if (moves === 9) {
        setWinner("Draw");
        return;
      }
    }
  }, [board, setWinner, moves]);

  return (
    <BoardContext.Provider value={{ board, selectPosition, resetBoardContext }}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);

export default BoardContext;
