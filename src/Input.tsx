import React from "react";
import * as THREE from "three";
import { useThree, useUpdate } from "react-three-fiber";

interface Props {
  onIntersect: (obj: THREE.Intersection) => void;
}
const Input: React.FC<Props> = (props: Props) => {
  const { camera, scene } = useThree();
  const raycaster = React.useRef<THREE.Raycaster>();
  React.useEffect(() => {
    const listener = event => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera({ x, y }, camera);
      const objects = raycaster.current.intersectObjects(scene.children, true);
      if (objects.length) {
        const target = objects.find(x => x.object.name === "board");
        if (target) props.onIntersect(target);
        // props.onIntersect(objects[0]);
      }
    };
    document.addEventListener("mouseup", listener);
    return () => {
      document.removeEventListener("mouseup", listener);
    };
  }, [scene.children, camera, props]);

  return <raycaster ref={raycaster} camera={camera} />;
};

export default Input;
