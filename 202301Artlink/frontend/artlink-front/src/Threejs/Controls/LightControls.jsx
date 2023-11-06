import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, RandomizedLight } from "@react-three/drei";

const LightController = () => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 10;
    const angle = elapsedTime * 0.1; // 움직이는 속도를 조정합니다.

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    lightRef.current.position.set(x, 10, z);
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={0.5}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <ambientLight intensity={0.4} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
    </>
  );
};

export default LightController;
