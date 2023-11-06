/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Ivan Norman (https://sketchfab.com/vanidza)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/3d-models/low-poly-truck-car-drifter-f3750246b6564607afbefc61cb1683b1
title: Low-poly truck (car "Drifter")
*/

import { forwardRef  } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const Drifter = forwardRef(({ args = [1.7, 1, 4], mass = 500, setVisible, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/drifter.glb');

  const [, api] = useBox(
    () => ({
      mass,
      args,
      allowSleep: false,
      ...props
    }),
    ref
  );

  return (
    <mesh ref={ref} api={api} userData={{ id: 'drifter' }} {...props}>
      <group position={[0, -0, 0]} scale={[0.009, 0.009, 0.009]} dispose={null}>
        <group rotation={[0, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            <group name="Frame" rotation={[0, 0, 0]} scale={[300, 100, 50]}>
              <mesh geometry={nodes.Frame_Orange_0.geometry} material={materials.Orange} castShadow />
              <mesh geometry={nodes.Frame_Black_0.geometry} material={nodes.Frame_Black_0.material} castShadow />
              <mesh geometry={nodes.Frame_Glass_0.geometry} material={materials.Glass} />
              <mesh geometry={nodes.Frame_Light_0.geometry} material={materials.Light} />
              <mesh geometry={nodes.Frame_Light_red_0.geometry} material={materials.Light_red} />
              <mesh geometry={nodes.Frame_Dark_brown_0.geometry} material={materials.Dark_brown} />
              <mesh geometry={nodes.Frame_Dark_brown_handle_0.geometry} material={materials.Dark_brown_handle} />
              <mesh geometry={nodes.Frame_Glass_trailer_0.geometry} material={materials.Glass_trailer} />
              <mesh geometry={nodes.Frame_Light_black_0.geometry} material={nodes.Frame_Light_black_0.material} />
              <mesh geometry={nodes.Frame_Brown_0.geometry} material={materials.Brown} castShadow />
            </group>
          </group>
        </group>
      </group>
    </mesh>
  );
});

useGLTF.preload('/drifter.glb');

export default Drifter;
