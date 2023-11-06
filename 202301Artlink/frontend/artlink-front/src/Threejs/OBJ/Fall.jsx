import { useEffect } from "react";
import { useSphere } from "@react-three/cannon";

export default function Fall() {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 10, 0],
    args: [1], // 구의 반지름
  }));

  useEffect(() => {
    api.velocity.set(0, -10, 0); // 초기 속도 설정
  }, [api.velocity]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial color="#2196f3" />
    </mesh>
  );
}
