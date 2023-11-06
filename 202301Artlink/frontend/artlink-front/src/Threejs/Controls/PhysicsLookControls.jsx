import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { Euler, Vector3, Quaternion } from "three";
import usePlayerControls from "../Test/usePlayerControls/usePlayerControls";

const euler = new Euler(0, 0, 0, "YXZ");
const vec = new Vector3();

const PhysicsLookControls = () => {
  const { camera, gl } = useThree();
  // const euler = useRef(new Euler(0, 0, 0, "YXZ"));
  const cameraDirection = useRef();
  const cameraUp = useRef();

  const [cameraBoxRef] = useBox(() => ({
    mass: 1,
    args: [1, 3, 1],
    position: [8, 10, 6],
    rotation: [0, 1, 0],
    linearDamping: 0.9,
    angularDamping: 0.1,
    // fixedRotation: true, // 물체 회전 방지
  }));

  const state = useRef({
    distance: 0,
    zoom: 0,
    drag: false,
    prev: { screenX: null, screenY: null },
  });

  useEffect(() => {
    cameraDirection.current = new Vector3();
    cameraUp.current = new Vector3(0, 1, 0);
    const onKeyDown = (e) => {
      // Handle key down events for camera control (wsad movement)
      
    };

    const onKeyUp = (e) => {
      // Handle key up events for camera control (wsad movement)
    };

    const onWheel = (e) => {
      // Handle mouse wheel events for camera control (zoom in/out)
      e.preventDefault(); // Prevent default scroll behavior
      console.log("훨돌아간다");
      const deltaY = e.deltaY;
      const zoomSpeed = 0.02;
      const direction = new Vector3();
      camera.getWorldDirection(direction);

      if (deltaY < 0) {
        // Zoom In
        state.current.zoom += zoomSpeed;
        camera.position.addScaledVector(direction, zoomSpeed);
      } else if (deltaY > 0) {
        // Zoom Out
        state.current.zoom -= zoomSpeed;
        camera.position.addScaledVector(direction, -zoomSpeed);
      }
    };
    const onMouseDown = (e) => {
      // Handle mouse down events for camera control (rotate view)
      state.current.drag = true;
      e.target.style.cursor = "grabbing";
      state.current.prev.screenX = e.screenX;
      state.current.prev.screenY = e.screenY;
    };

    const onMouseUp = (e) => {
      // Handle mouse up events for camera control (rotate view)
      state.current.drag = false;
      e.target.style.cursor = "grab";
    };

    const onMouseMove = (e) => {
      // Handle mouse move events for camera control (rotate view)
      if (state.current.drag) {
        if (e.buttons === 1) {
          const dx = e.screenX - state.current.prev.screenX;
          const dy = e.screenY - state.current.prev.screenY;
          console.log("왼쪽", euler.y, dx, dy);

          euler.y -= dx * 0.002;
          euler.x -= dy * 0.002;
          euler.setFromQuaternion(camera.quaternion);
          console.log("변경후", euler.y, dx, dy);

          camera.quaternion.setFromEuler(euler);
          state.current.prev.screenX = e.screenX;
          state.current.prev.screenY = e.screenY;
        } else {
          const dx = e.screenX - state.current.prev.screenX;
          const dy = e.screenY - state.current.prev.screenY;

          camera.position.x -= dx * 0.01;
          camera.position.y += dy * 0.01;
          state.current.prev.screenX = e.screenX;
          state.current.prev.screenY = e.screenY;
        }
      }
    };

    // Add event listeners here
    gl.domElement.addEventListener("mousedown", onMouseDown);
    gl.domElement.addEventListener("mouseup", onMouseUp);
    gl.domElement.addEventListener("mousemove", onMouseMove);
    gl.domElement.addEventListener("wheel", onWheel);
    // Add more event listeners as needed

    return () => {
      // Remove event listeners here
      gl.domElement.removeEventListener("mousedown", onMouseDown);
      gl.domElement.removeEventListener("mouseup", onMouseUp);
      gl.domElement.removeEventListener("mousemove", onMouseMove);
      gl.domElement.removeEventListener("wheel", onWheel);
    };
  }, [camera, gl]);


  useFrame((_, delta) => {
    // 마우스
    if (cameraBoxRef.current) {
      cameraBoxRef.current.getWorldPosition(camera.position);
      cameraBoxRef.current.getWorldQuaternion(camera.quaternion);
    }
    const zoomSpeed = 10.0;
    const direction = new Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, state.current.zoom * zoomSpeed);


    // Update camera rotation based on mouse drag (if dragging)
  });
  

  return null;
};

export default PhysicsLookControls;
