import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import img1 from "../../assets/terrain-normal.jpg";
import img2 from "../../assets/terrain-roughness.jpg";

export function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [img1, img2]);
  //    // 텍스처의 반복 횟수를 설정합니다.
  roughness.wrapS = roughness.wrapT = RepeatWrapping;
  normal.wrapS = normal.wrapT = RepeatWrapping;

  //    // 텍스처를 반복시킬 횟수를 설정합니다. (수치를 조절하여 비율을 조정합니다.)
  const textureRepeat = 100;
  roughness.repeat.set(textureRepeat, textureRepeat);
  normal.repeat.set(textureRepeat, textureRepeat);

  return (
    <RigidBody type="fixed">
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          dithering={true}
          color={[0.015, 0.015, 0.015]}
          roughness={0.7}
          blur={[1000, 400]}
          mixBlur={30}
          mixStrength={80}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
        />
      </mesh>
    </RigidBody>
  );
}
