/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Float,
  Icosahedron,
  MeshReflectorMaterial,
  OrbitControls,
  Point,
  Points,
  RoundedBox,
  Sphere,
  Stars,
  Torus,
  useHelper,
  Wireframe,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeElement,
} from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
  quat,
  vec3,
  euler,
  useAfterPhysicsStep,
} from "@react-three/rapier";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TvModel } from "./components/Model2";
import gsap from "gsap";
import { and } from "three/tsl";
import { DiceModel } from "./components/Dice";
import { InnModel } from "./components/Inn";

function Dice() {
  const diceRef = useRef<RapierRigidBody>(null);
  const [time, setTime] = useState(false)
  const randomNum = (max: number) => {Math.floor(Math.random() * max)}

  useEffect(()=>{
    const timer = setTimeout(() => {
    if(diceRef.current){
      diceRef.current.applyImpulse({x:60,y:100,z:60}, true)
    }}, 0);
    return
  }
)
  

  return (
    <RigidBody ref={diceRef} colliders={'hull'} position={[-6.0, 7.0, 0.0]}>
      <DiceModel scale={2}/>
    </RigidBody>
  )
}

function Light() {
  const dirRef = useRef<THREE.DirectionalLight>(null)
  useHelper(dirRef, THREE.DirectionalLightHelper, 1, 'red')
  return <directionalLight ref={dirRef} position={[0,15,0]} intensity={5} />
  
}

const App = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const [ani, setAni] = useState(1);
  const [isWake, setIsWake] = useState(true);
  
  const tl = gsap.timeline();
  
  const positions = []

  for (let i = 0; i < 500 ; i++) {
    // eslint-disable-next-line react-hooks/purity
    positions.push(Math.floor(Math.random())*5)
  }

  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [5, 5, 5] }}>
          <color attach={"background"} args={['black']} />
          <Light />
          <gridHelper args={[30, 30, 30]} />
          <axesHelper args={[10]} />
          <Suspense>
            <Physics >
              
              <Dice />
              
            </Physics>
            <Points limit={500} range={50} positions={positions}>
              <pointsMaterial />
              
            </Points>
            
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default App;
