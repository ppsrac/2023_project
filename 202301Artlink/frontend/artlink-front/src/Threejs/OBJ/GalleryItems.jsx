import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import "../../assets/Art.png"

const GOLDENRATIO = 1.61803398875
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "../../assets/Art.png" },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "../../assets/Art.png" },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url:"../../assets/Art.png" },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: "../../assets/Art.png" },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: "../../assets/Art.png" },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: "../../assets/Art.png" },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: "../../assets/Art.png" },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: "../../assets/Art.png" },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: "../../assets/Art.png" }
]

export default function Galleyitems() {
  <>
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
      </group>
  </>
  }
  
  function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
      clicked.current = ref.current.getObjectByName(params?.id)
      if (clicked.current) {
        clicked.current.parent.updateWorldMatrix(true, true)
        clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
        clicked.current.parent.getWorldQuaternion(q)
      } else {
        p.set(0, 0, 5.5)
        q.identity()
      }
    })
    useFrame((state, dt) => {
      easing.damp3(state.camera.position, p, 0.4, dt)
      easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return (
      <group
        ref={ref}
        onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
        onPointerMissed={() => setLocation('/')}>
        {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
      </group>
    )
  }
  
  export function Frame({ url, p1, p2,c = new THREE.Color(), ...props }) {
    const image = useRef()
    const frame = useRef()
    const [hovered, hover] = useState(false)
    const name = getUuid(url)
    useCursor(hovered)
    
    return (
      <group {...props}>
        <mesh
          name={name}
          onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          onPointerOut={() => hover(false)}
          scale={[1, GOLDENRATIO, 0.05]}
          position={[p1, GOLDENRATIO / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
        </mesh>
        <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55 + p1, GOLDENRATIO, 0]} fontSize={0.025}>
          {name.split('-').join(' ')}
        </Text>
      </group>
    )
  }