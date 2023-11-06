// import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Stars,
  Sky,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import IMG1 from "../assets/artwork/artwork1.jpg";
import IMG2 from "../assets/artwork/artwork2.jpg";
import IMG3 from "../assets/artwork/artwork3.jpg";
import IMG4 from "../assets/artwork/artwork4.png";
import IMG5 from "../assets/artwork/artwork5.png";
import IMG6 from "../assets/artwork/artwork6.png";

// Controls
import { handleDoubleClick } from "../Threejs/Funtions/Fullscreen";
import Character from "../Threejs/Controls/Character";

// Light
import LightControls from "../Threejs/Controls/LightControls";
import SpotLight1 from "../Threejs/Controls/SpotLight1";
import SpotLight2 from "../Threejs/Controls/SpotLight2";

// OBJ
// import ShapeTest from "../Threejs/OBJ/ShapeTest";
import { Ground } from "../Threejs/OBJ/Groud";
import { Frame } from "../Threejs/OBJ/GalleryItems";

// test
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Boxes } from "../Threejs/OBJ/Boxes";
import { Boxes2 } from "../Threejs/OBJ/Boxes2";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
];

// 컴포넌트 구성
function ThreeTest() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ height: "100%" }}
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
          position: [0, 0, -1],
        }}
        onDoubleClick={(event) => handleDoubleClick(event)}
      >
        {/* 이펙트 입니다. */}
        <Stars />
        <Sky sunPosition={[1000, 10, 1]} />
        {/* <gridHelper /> */}

        {/* 빛 입니다. */}
        <LightControls />
        <SpotLight1 />
        <SpotLight2 />

        {/* Test */}
        <EffectComposer>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={0.1} // The bloom intensity.
            width={100} // render width
            height={100} // render height
            kernelSize={5} // blur kernel size
            luminanceThreshold={0.15}
            luminanceSmoothing={0.025}
          />
        </EffectComposer>
        <Boxes />
        <Boxes2 />
        {/* <Galleyitems /> */}
        <Frame url={IMG1} p1={0} p2={0} name={"zz"} />
        <Frame url={IMG2} p1={2} p2={2} />
        <Frame url={IMG3} p1={4} p2={4} />
        <Frame url={IMG4} p1={6} p2={6} />
        <Frame url={IMG5} p1={8} p2={8} />
        <Frame url={IMG6} p1={10} p2={10} />
        <Physics>
          {/* 플레이어 */}
          <KeyboardControls map={keyboardMap}>
            <Character />
          </KeyboardControls>
          {/* <ShapeTest /> */}
          <Ground />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

export default ThreeTest;
