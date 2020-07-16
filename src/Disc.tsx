import React from "react";
import { DiscInfo } from "./types";
import * as THREE from "three";

interface Props {
  info: DiscInfo;
}
const Disc: React.FC<Props> = ({ info }: Props) => {
  if (!info) return null;
  const color = info.isBlack ? "#222" : "white";
  return (
    <group position={info.position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[2, 2, 0.5, 13]} />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[2, 2, 0.5, 13]} />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
    </group>
  );
};

export default Disc;
