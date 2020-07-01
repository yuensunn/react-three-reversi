import React from "react";
import { DiscInfo, DiscColor } from "./types";
import { produce } from "immer";
interface Props {
  size: number;
  tileSize: number;
}
const getArrayIndex = (x: number, y: number, size: number) => y * size + x;
const placeAt = (
  x: number,
  y: number,
  move: number,
  size: number,
  tileSize: number
): DiscInfo => {
  const offset = tileSize / 2;
  const cartesianX = x - size / 2;
  const cartesianY = y - size / 2;
  let boardX = cartesianX * tileSize + offset;
  let boardY = cartesianY * tileSize + offset;
  return {
    id: move.toString(),
    position: [boardX, 0.5, -boardY],
    isBlack: !!(move % 2)
  };
};
const generateInitialState = (size: number, tileSize: number): DiscInfo[] => {
  const arr = Array<DiscInfo>(size);
  const low = size / 2 - 1; //lower half
  const high = size / 2; // higher half
  arr[getArrayIndex(low, low, size)] = placeAt(low, low, 0, size, tileSize);
  arr[getArrayIndex(low, high, size)] = placeAt(low, high, 1, size, tileSize);
  arr[getArrayIndex(high, low, size)] = placeAt(high, low, 3, size, tileSize);
  arr[getArrayIndex(high, high, size)] = placeAt(high, high, 2, size, tileSize);
  return arr;
};

const useGameManager = (props: Props) => {
  const [move, setMove] = React.useState<number>(4);
  const [discs, setDiscs] = React.useState<DiscInfo[]>(
    generateInitialState(props.size, props.tileSize)
  );
  const placeAtUv = React.useCallback(
    (xx: number, yy: number) => {
      const x = Math.floor(xx * props.size);
      const y = Math.floor(yy * props.size);
      const index = getArrayIndex(x, y, props.size);
      if (discs[index]) return;
      setDiscs(
        produce(discs, draft => {
          draft[index] = placeAt(x, y, move, props.size, props.tileSize);
        })
      );
      setMove(_move => _move + 1);
    },
    [discs, props, move]
  );

  return { discs, placeAtUv };
};
export default useGameManager;
