import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoader를 사용하도록 변경

const AnimatedObject = () => {
  const { scene } = useThree();
  const ref = useRef();
  const mixer = useRef();

  useEffect(() => {
    const glbURL = require("../../../public/buildtest.glb"); // GLB 파일 경로로 변경
    const gltfLoader = new GLTFLoader(); // GLTFLoader로 변경

    gltfLoader.load(glbURL, function (gltf) {
      // load 메서드 사용
      const object = gltf.scene;
      object.scale.set(0.02, 0.02, 0.02);
      object.castShadow = true;
      object.receiveShadow = true;
    });
  }, [scene]);

  return ref.current ? (
    <primitive castShadow receiveShadow object={ref.current} />
  ) : null;
};

export default AnimatedObject;
