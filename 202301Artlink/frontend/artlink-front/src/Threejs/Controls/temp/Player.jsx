import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard"; // + 만들어 둔 hook을 추가하자

const JUMP_FORCE = 4; // + Player JUMP 발생시 적용할 힘의 값
const SPEED = 4; // + 이동 SPEED를 위해 추가


export const Player = () => {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [10, 1, 10],
  }));

 
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  // 카메라의 초기 방향을 설정
  useEffect(() => {
    camera.rotation.set(0, -24.4, 0); // x: 0, y: 180도(라디안), z: 0
  }, [camera.rotation]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    const direction = new Vector3();

    // z(정면)축 기준으로 이동 계산
    // 만약 앞+뒤가 동시에 눌리면 -를 통해 값을 0으로 만들어 이동하지 않음
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    // x축 기준 이동 계산
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // 이동 속도를 반영
    api.velocity.set(direction.x, vel.current[1], direction.z);
    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
    
  });
  return <mesh ref={ref}></mesh>;
};