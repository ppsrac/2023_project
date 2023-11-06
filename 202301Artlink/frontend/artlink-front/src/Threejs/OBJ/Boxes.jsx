import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color } from "three";

function Box({ color }) {
  const box = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  function getInitialPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 30, Math.random() * 10 + 0.1, (Math.random() * 4 - 1) * 20); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    return v;
  }
  function getRandomColor() {
    const color = new Color(Math.random(), Math.random(), Math.random());
    return color.toArray();
  }

  function resetPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 30, Math.random() * 10 + 0.1, Math.random() * 50 + 30); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
        // 이동속도
      time.current += delta * 1.2;
      let newZ = position.z - (time.current);

      if(newZ < -30) {
        resetPosition();
        time.current = 0;
      }

      box.current.position.set(
        position.x, 
        position.y, 
        newZ, 
      )
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh
      ref={box}
      rotation-x={Math.PI * 20}
      scale={scale}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={getRandomColor()} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Boxes() {
  const [arr] = useState(() => {
    let a = [];
    for(let i = 0; i < 300; i++) a.push(0);
    return a;
  });

  return <>
    {arr.map((e, i) => <Box key={i}/>)}
  </>
}