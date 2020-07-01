import React from "react";
import { useThree, useUpdate } from "react-three-fiber";

function Camera(props) {
  const { setDefaultCamera } = useThree();
  const ref = useUpdate(camera => {
    setDefaultCamera(camera);
  });
  return <perspectiveCamera ref={ref} {...props} />;
}

export default Camera;
