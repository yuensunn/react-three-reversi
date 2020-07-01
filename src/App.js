import React, { Suspense } from "react";
import "./styles.css";
import { Canvas } from "react-three-fiber";
import Box from "./Box";
import Camera from "./Camera";
import Board from "./Board";
import Disc from "./Disc";
import useGameManager from "./useGameManager";
import CameraControl from "./CameraControl";
import Input from "./Input";

export default function App() {
  const { discs, placeAtUv } = useGameManager({ size: 8, tileSize: 5 });
  return (
    <Canvas style={{ height: window.innerHeight }}>
      <Input
        onIntersect={obj => {
          placeAtUv(obj.uv.x, obj.uv.y);
        }}
      />
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color={"#ffff32"} />
      {/* <Box /> */}
      <Camera position={[0, 45, 45]} />
      <CameraControl />
      <Suspense fallback={<Box />}>
        <Board>
          {discs.map(x => (
            <Disc key={x?.id} info={x} />
          ))}
        </Board>
      </Suspense>
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
    </Canvas>
  );
}
