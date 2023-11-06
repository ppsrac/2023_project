import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const AnimatedObject = () => {
  const { scene } = useThree();
  const ref = useRef();
  const mixer = useRef();

  useEffect(() => {
    const fbxURL = require("../Models/joyful.fbx");
    const fbxLoader = new FBXLoader();

    fbxLoader.load(fbxURL, function (object) {
      object.scale.set(0.02, 0.02, 0.02);
      object.castShadow = true;
      object.receiveShadow = true;

      // 애니메이션 추가
      mixer.current = new THREE.AnimationMixer(object);
      const clips = object.animations;
      const action = mixer.current.clipAction(clips[0]);
      action.play();

      scene.add(object);
      ref.current = object;
    });
  }, [scene]);

  useFrame((_, delta) => {
    // 애니메이션 업데이트
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return ref.current ? (
    <primitive castShadow receiveShadow object={ref.current} />
  ) : null;
};

export default AnimatedObject;
