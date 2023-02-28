import { IPlayer } from "./player";

export type IPlayerOrEmpty = "" | IPlayer;

export type IBoard = [
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty],
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty],
  [IPlayerOrEmpty, IPlayerOrEmpty, IPlayerOrEmpty]
];
