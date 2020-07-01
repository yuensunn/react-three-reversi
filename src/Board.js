import React from "react";
import { useLoader, useUpdate } from "react-three-fiber";
import * as THREE from "three";
const Board = ({ children }) => {
  const gr = React.useRef();
  const [texture] = useLoader(THREE.TextureLoader, ["/grid.jpg"]);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <group ref={gr}>
      <mesh name={"board"}>
        <boxBufferGeometry attach="geometry" args={[40, 0.5, 40]} />
        <meshStandardMaterial
          color="mediumspringgreen"
          attachArray="material"
        />
        <meshStandardMaterial
          color="mediumspringgreen"
          attachArray="material"
        />
        <meshBasicMaterial map={texture} attachArray="material" />
        <meshBasicMaterial map={texture} attachArray="material" />
        <meshStandardMaterial
          color="mediumspringgreen"
          attachArray="material"
        />
        <meshStandardMaterial
          color="mediumspringgreen"
          attachArray="material"
        />
      </mesh>
      {children}
    </group>
  );
};

export default Board;
