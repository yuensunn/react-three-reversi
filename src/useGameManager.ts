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
  id: number,
  size: number,
  tileSize: number,
  isBlack: boolean
): DiscInfo => {
  const offset = tileSize / 2;
  const cartesianX = x - size / 2;
  const cartesianY = y - size / 2;
  let boardX = cartesianX * tileSize + offset;
  let boardY = cartesianY * tileSize + offset;
  return {
    id: id.toString(),
    position: [boardX, 0.5, -boardY],
    isBlack
  };
};
const generateInitialState = (size: number, tileSize: number): DiscInfo[] => {
  const arr = Array<DiscInfo>(size);
  const low = size / 2 - 1; //lower half
  const high = size / 2; // higher half

  arr[getArrayIndex(low, low, size)] = placeAt(
    low,
    low,
    0,
    size,
    tileSize,
    true
  );
  arr[getArrayIndex(low, high, size)] = placeAt(
    low,
    high,
    1,
    size,
    tileSize,
    false
  );
  arr[getArrayIndex(high, low, size)] = placeAt(
    high,
    low,
    3,
    size,
    tileSize,
    false
  );
  arr[getArrayIndex(high, high, size)] = placeAt(
    high,
    high,
    2,
    size,
    tileSize,
    true
  );
  return arr;
};

const getTargets = (
  board: DiscInfo[],
  direction: number[],
  x: number,
  y: number,
  size: number,
  isBlack: boolean
) => {
  let targetIndices: number[] = [];
  let loop = 0;
  for (let step = 0; step < size; step++) {
    loop++;
    const index = getArrayIndex(
      x + step * direction[0] + 1 * direction[0],
      y + step * direction[1] + 1 * direction[1],
      size
    );

    const target = board[index];
    if (!target) targetIndices = [];
    else if (target.isBlack !== isBlack) {
      targetIndices.push(index);
      continue;
    }
    break;
  }
  return targetIndices;
};

const getConvertible = (
  board: DiscInfo[],
  x: number,
  y: number,
  isBlack: boolean,
  size: number
) => {
  const top = getTargets(board, [0, 1], x, y, size, isBlack);
  const left = getTargets(board, [-1, 0], x, y, size, isBlack);
  const right = getTargets(board, [1, 0], x, y, size, isBlack);
  const bottom = getTargets(board, [0, -1], x, y, size, isBlack);
  const topLeft = getTargets(board, [-1, 1], x, y, size, isBlack);
  const topRight = getTargets(board, [1, 1], x, y, size, isBlack);
  const bottomLeft = getTargets(board, [-1, -1], x, y, size, isBlack);
  const bottomRight = getTargets(board, [1, -1], x, y, size, isBlack);
  const targetIndices = [
    ...top,
    ...left,
    ...right,
    ...bottom,
    ...topLeft,
    ...topRight,
    ...bottomLeft,
    ...bottomRight
  ];
  return targetIndices;
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
      const isBlack = !!(move % 2);
      if (discs[index]) return;
      const targetIndices = getConvertible(discs, x, y, isBlack, props.size);
      if (targetIndices.length) {
        setDiscs(
          produce(discs, draft => {
            for (let i in targetIndices) {
              draft[targetIndices[i]].isBlack = isBlack;
            }
            draft[getArrayIndex(x, y, props.size)] = placeAt(
              x,
              y,
              move,
              props.size,
              props.tileSize,
              isBlack
            );
          })
        );
        setMove(_move => _move + 1);
      }
    },
    [discs, props, move]
  );

  // console.log(!!(move % 2));

  return { discs, placeAtUv };
};
export default useGameManager;
