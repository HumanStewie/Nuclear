import {
  Box,
  Float,
  Icosahedron,
  OrbitControls,
  RoundedBox,
  Sphere,
  Torus,
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
} from "@react-three/rapier";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./components/Model2";
import gsap from "gsap";
import { and } from "three/tsl";

const App = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const [ani, setAni] = useState(1);
  const [isWake, setIsWake] = useState(true);
  let count = 0;

  function Float() {
    if (rigidBodyRef.current?.isSleeping) {
      rigidBodyRef.current?.applyImpulse({ x: -30, y: -20, z: -30 }, true);
    }
  }
  const tl = gsap.timeline();
  const r = Date.now() * 0.0005;
  useLayoutEffect(() => {
    tl.to(icoRef.current?.position, {
      x: 0,
      y: 3,
      z: -1.46,
    });
  });

  useFrame(({ clock }) => {
    if (icoRef.current!) {
      icoRef.current.rotation.x = clock.elapsedTime;
    }
  });

  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [5, 5, 5] }}>
          <gridHelper args={[30, 30, 30]} />
          <axesHelper args={[10]} />
          <Suspense>
            <Physics debug>
              <RigidBody
                ref={rigidBodyRef}
                colliders={"hull"}
                restitution={0.5}
                position={[0.0, 7.0, 0.0]}
                gravityScale={2}
                type="dynamic"
              >
                <Icosahedron args={[1, 0]} ref={icoRef}>
                  <Wireframe
                    stroke={"white"}
                    fillMix={1}
                    fillOpacity={0}
                    backfaceStroke={"grey"}
                    squeeze
                    squeezeMin={0.3}
                    squeezeMax={2.5}
                  ></Wireframe>
                </Icosahedron>
              </RigidBody>

              <CuboidCollider position={[0, -1, 0]} args={[30, 0.5, 30]} />
            </Physics>
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default App;
