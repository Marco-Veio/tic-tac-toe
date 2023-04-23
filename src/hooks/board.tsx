import { IBoard, IOrientation } from "@/types/board";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePlayer } from "./player";

interface Props {
  children: ReactNode;
}

interface BoardContextProps {
  board: IBoard;
  checkingWinner: boolean;
  winPosition: number;
  winOrientation: IOrientation;
  moves: number;
  selectPosition: (row: number, column: number) => void;
  resetBoardContext: () => void;
}

const BoardContext = createContext({} as BoardContextProps);

export function BoardProvider({ children }: Props) {
  const { player, togglePlayer, setWinner, resetPlayerContext } = usePlayer();
  const [board, setBoard] = useState<IBoard>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [moves, setMoves] = useState(0);
  const [winPosition, setWinPosition] = useState(0);
  const [winOrientation, setWinOrientation] = useState<IOrientation>();
  const [checkingWinner, setCheckingWinner] = useState(false);

  const selectPosition = (row: number, column: number) => {
    setCheckingWinner(true);
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
    setWinOrientation(undefined);
    setCheckingWinner(false);
  };

  useEffect(() => {
    if (
      board[1][1] !== "" &&
      ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
    ) {
      setWinner(board[1][1]);
      setWinOrientation(
        board[0][0] === board[1][1] && board[2][2] === board[1][1]
          ? "Diagonal1"
          : "Diagonal2"
      );
      setCheckingWinner(false);
    } else {
      for (const index in board) {
        if (
          board[index][0] !== "" &&
          board[index][0] === board[index][1] &&
          board[index][1] === board[index][2]
        ) {
          setWinner(board[index][0]);
          setWinOrientation("Horizontal");
          setWinPosition(+index);
          setCheckingWinner(false);
          return;
        }
        if (
          board[0][index] !== "" &&
          board[0][index] === board[1][index] &&
          board[1][index] === board[2][index]
        ) {
          setWinner(board[0][index]);
          setWinOrientation("Vertical");
          setWinPosition(+index);
          setCheckingWinner(false);
          return;
        }
      }
      if (moves === 9) {
        setWinner("Draw");
        setCheckingWinner(false);
        return;
      }
    }
    setCheckingWinner(false);
  }, [moves]);

  return (
    <BoardContext.Provider
      value={{
        board,
        checkingWinner,
        winPosition,
        winOrientation,
        moves,
        selectPosition,
        resetBoardContext,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);

export default BoardContext;
