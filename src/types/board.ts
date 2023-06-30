import { IPlayer } from "./player";

export type IPlayerOrEmpty = "" | IPlayer;

export type IBoard = [
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty],
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty],
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty],
];

export type IOrientation = "Horizontal" | "Vertical" | "Diagonal1" | "Diagonal2" | undefined;
