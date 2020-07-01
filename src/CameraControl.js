import React from "react";
import { extend, useThree, useFrame, useUpdate } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const CameraControl = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  const ref = useUpdate(controls => {});
  useFrame(state => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      args={[camera, domElement]}
      enableZoom={false}
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI}
      // minAzimuthAngle={-Math.PI / 4}
      // minPolarAngle={0}
    />
  );
};
export default CameraControl;
