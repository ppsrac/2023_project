import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";

const euler = new Euler(0, 0, 0, "YXZ");
const vec = new Vector3();

const useCodes = () => {
  const codes = useRef(new Set());

  useEffect(() => {
    const onKeyDown = (e) => codes.current.add(e.code);
    const onKeyUp = (e) => codes.current.delete(e.code);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);
  return codes;
};

export default function LookControls() {
  /////////// 아래는 마우스 컨트롤러 입니다
  const { camera, gl } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 10, 0],
    args: [1], // 구의 반지름
  }));

  useEffect(() => {
    const state = {
      distance: 0,
      zoom: 0,
      drag: false,
      prev: { screenX: null, screenY: null },
    };
    // api.velocity.set(0, -10, 0); // 초기 속도 설정
    gl.domElement.style.cursor = "grab";
    const onContextMenu = (e) => {
      e.preventDefault(); // 기본 컨텍스트 메뉴 동작 취소
    };

    const onWheel = (e) => {
      e.preventDefault(); // 기본 스크롤 동작 취소
      const deltaY = e.deltaY;
      const zoomSpeed = 0.44;
      const direction = new Vector3();
      camera.getWorldDirection(direction);

      if (deltaY <= 0) {
        // Zoom In
        state.zoom += zoomSpeed;
        camera.position.addScaledVector(direction, zoomSpeed);
      } else if (deltaY > 0) {
        // Zoom Out
        state.zoom -= zoomSpeed;
        camera.position.addScaledVector(direction, -zoomSpeed);
      }
    };

    const onMouseDown = (e) => {
      if (e.button === 0) {
        // 마우스 왼쪽 버튼인 경우에만 실행
        state.drag = true;
        e.target.style.cursor = "grabbing";
        state.prev.screenX = e.screenX;
        state.prev.screenY = e.screenY;
      }
      if (e.button === 2) {
        // Right Button Down
        state.drag = true;
        e.target.style.cursor = "grabbing";
        state.prev.screenX = e.screenX;
        state.prev.screenY = e.screenY;
      }
    };

    const onMouseUp = (e) => {
      state.drag = false;
      gl.domElement.style.cursor = "grab";
    };

    const onMouseMove = (e) => {
      if (state.drag) {
        if (e.buttons === 1) {
          console.log("왼쪽");
          const dx = e.screenX - state.prev.screenX;
          const dy = e.screenY - state.prev.screenY;

          euler.setFromQuaternion(camera.quaternion);
          euler.y -= dx * 0.002;
          euler.x -= dy * 0.002;
          camera.quaternion.setFromEuler(euler);
          state.prev.screenX = e.screenX;
          state.prev.screenY = e.screenY;
        } else {
          const dx = e.screenX - state.prev.screenX;
          const dy = e.screenY - state.prev.screenY;

          camera.position.x -= dx * 0.01;
          camera.position.y += dy * 0.01;
          state.prev.screenX = e.screenX;
          state.prev.screenY = e.screenY;
        }
      }
    };
    gl.domElement.addEventListener("contextmenu", onContextMenu);
    gl.domElement.addEventListener("wheel", onWheel);
    gl.domElement.addEventListener("mousemove", onMouseMove);
    gl.domElement.addEventListener("mousedown", onMouseDown);
    gl.domElement.addEventListener("mouseup", onMouseUp);

    return () => {
      gl.domElement.removeEventListener("contextmenu", onContextMenu);
      gl.domElement.removeEventListener("wheel", onWheel);
      gl.domElement.removeEventListener("mousemove", onMouseMove);
      gl.domElement.removeEventListener("mousedown", onMouseDown);
      gl.domElement.removeEventListener("mouseup", onMouseUp);
    };
  }, [camera, gl]);

  /////////////////////// 아래는 키보드 컨트롤러입니다.
  const code = useCodes();
  const moveForward = (distance) => {
    vec.set(0, 0, -1);
    vec.applyQuaternion(camera.quaternion);
    vec.y = 0; // 상하 이동에만 필요한 y 방향 벡터를 0으로 설정
    vec.normalize(); // 벡터의 길이를 1로 정규화
    camera.position.addScaledVector(vec, distance);
  };
  const moveRight = (distance) => {
    vec.set(1, 0, 0);
    vec.applyQuaternion(camera.quaternion);
    // vec.normalize(); // 벡터의 길이를 1로 정규화
    camera.position.addScaledVector(vec, distance);
  };
  const jump = () => {
    const jumpHeight = 1; // 점프 높이 설정
    const jumpDuration = 2; // 점프 지속 시간 설정 (초)
    const jumpSpeed = jumpHeight / jumpDuration; // 점프 속도 계산

    let jumpProgress = 0; // 점프 진행도
    const originalY = camera.position.y; // 원래 y 좌표 저장

    const jumpAnimation = () => {
      const deltaTime = 0.016; // 약 60fps로 가정
      jumpProgress += deltaTime; // 점프 진행도 업데이트
      if (jumpProgress >= jumpDuration) {
        // 점프가 끝난 경우
        camera.position.y = originalY; // 원래 자리로 돌아감
        return;
      }
      // 점프 중인 경우
      const jumpDistance = jumpSpeed * deltaTime; // 점프 거리 계산
      camera.position.y =
        originalY +
        jumpHeight * Math.sin((jumpProgress / jumpDuration) * Math.PI); // 점프 위치 업데이트
      requestAnimationFrame(jumpAnimation); // 다음 프레임 요청
    };

    requestAnimationFrame(jumpAnimation); // 점프 애니메이션 시작
  };
  useFrame((_, delta) => {
    const speed = code.current.has("ShiftLeft") ? 5 : 2;
    if (code.current.has("KeyW")) moveForward(delta * speed);
    if (code.current.has("KeyA")) moveRight(-delta * speed);
    if (code.current.has("KeyS")) moveForward(-delta * speed);
    if (code.current.has("KeyD")) moveRight(delta * speed);
    if (code.current.has("KeyQ")) camera.position.y += delta * speed; // Q를 누르면 위로 이동
    if (code.current.has("KeyE")) camera.position.y -= delta * speed; // E를 누르면 아래로 이동
    if (code.current.has("Space")) jump(); // Spacebar를 누르면 점프
  });

  return null;
}
