// import React from "react";
import { Plane } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";

export default function PhysicsPlane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <Plane ref={ref} args={[200, 200]} receiveShadow>
      <meshPhysicalMaterial color="#ffffff" args={[200, 200]} />
    </Plane>
  );
}
