import { Gltf,useGLTF} from "@react-three/drei";
import React, { useRef, useLayoutEffect } from 'react'
import { Group, MeshBasicMaterial, TextureLoader  } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RigidBody, CuboidCollider, InstancedRigidBodies } from '@react-three/rapier'


export default  function ShapeTest() {
    const { nodes, materials } = useGLTF('../../../public/gall3.glb')
    console.log(nodes);
    console.log(materials);

    // Create a material and set the texture as its map
    const texture = new TextureLoader().load('../../../public/concrete.jpg');
    const customMaterial = new MeshBasicMaterial({ map: texture });

    return (
      <>
      <group>
        {/* all item */}
        {Object.keys(nodes).map((nodeName, index) => (
        <RigidBody type="fixed">
          <mesh
            key={index}
            receiveShadow
            castShadow
            geometry={nodes[nodeName].geometry}
            material={materials.Custom}
          />
        </RigidBody>
      ))}
      </group>

        
      </>
    )
  }