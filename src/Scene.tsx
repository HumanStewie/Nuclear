import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Suspense,
  use,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type Ref,
} from "react";
import * as THREE from "three";
import {
  OrbitControls,
  useTexture,
  Wireframe,
  Icosahedron,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import { Model } from "./components/Model2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function BackgroundColor() {
  const { scene } = useThree();
  scene.background = new THREE.Color("darkgrey");
  return null;
}

function Box() {
  return (
    <>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />

        <meshBasicMaterial />
      </mesh>
    </>
  );
}

function ReverseAnimateCamera() {
  const { camera } = useThree();
  const tl = gsap.timeline();
  useLayoutEffect(() => {
    tl.to(camera.position, {
      x: 9,
      y: 9,
      z: 9,
      duration: 2,
      ease: "power3.inOut",
    });
  });
  return null;
}

function AnimateCamera() {
  const { camera } = useThree();
  const tl = gsap.timeline({});
  useLayoutEffect(() => {
    tl.to(camera.position, {
      x: 5,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power3.inOut",
    });
  });
  return null;
}

interface ObjProps {
  ref: React.RefObject<THREE.Mesh>;
}

function Primitive({ ref }: ObjProps) {
  let i = 0.3;
  let j = 2.5;
  let r = Date.now() * 0.0005;
  useFrame(({ clock }) => {
    if (ref.current!) {
      ref.current.rotation.x = clock.elapsedTime / 10;
      ref.current.rotation.y = clock.elapsedTime / 10;
      ref.current.rotation.z = clock.elapsedTime / 10;
    }
  });

  return (
    <>
      <mesh ref={ref} position={[0, 1, 0]}>
        <icosahedronGeometry args={[9, 0]} />
        <meshStandardMaterial color="tomato" />
        <Wireframe
          stroke={"white"}
          fillMix={1}
          fillOpacity={0}
          backfaceStroke={"grey"}
          squeeze
          squeezeMin={i}
          squeezeMax={j}
        ></Wireframe>
      </mesh>
    </>
  );
}

function Floating() {
  const obj = useRef<THREE.Mesh>(null!);
  // <Float rotationIntensity={0} floatIntensity={2} floatingRange={[-1, 1]} />
  //      <Float rotationIntensity={4} floatIntensity={0}></Float>

  const tl = gsap.timeline({
    repeat: -1,
  });

  useLayoutEffect(() => {
    tl.to(obj.current.position, {
      y: -1,
      duration: 2,
      ease: "power1.inOut",
    }).to(obj.current.position, {
      y: 1,
      duration: 2,
      ease: "power1.inOut",
    });
  });

  return (
    <>
      <Primitive ref={obj} />
    </>
  );
}

interface StaticProps {
  isStatic: boolean;
}

function Static({ isStatic }: StaticProps) {
  const obj = useRef<THREE.Mesh>(null!);
  const tl = gsap.timeline({ repeat: -1 });

  useLayoutEffect(() => {
    tl.to(obj.current.position, {
      y: -1,
      duration: 2,
      ease: "power1.inOut",
    }).to(obj.current.position, {
      y: 1,
      duration: 2,
      ease: "power1.inOut",
    });
    if (isStatic) {
      tl.pause();
    }
  });

  return (
    <>
      <Primitive ref={obj} />
    </>
  );
}

function Scene() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  return (
    <>
      <div id="ontop">
        <button
          type="button"
          className="test"
          id="myButton"
          onClick={() => (animate ? setAnimate(false) : setAnimate(true))}
        >
          Click me
        </button>
      </div>
      <div id="canvas-container">
        <Canvas camera={{ position: [9, 9, 9] }}>
          {animate ? <AnimateCamera /> : <ReverseAnimateCamera />}
          <ambientLight intensity={10} />
          <Float
            rotationIntensity={0}
            floatingRange={[-1, 0.5]}
            floatIntensity={2}
          >
            <Primitive ref={ref}></Primitive>
          </Float>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
          <BackgroundColor />
          <gridHelper args={[30, 30, 30]}></gridHelper>
          <axesHelper args={[5]}></axesHelper>
        </Canvas>
      </div>
    </>
  );
}

export default Scene;
