/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
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
  MeshDistortMaterial,
  MeshReflectorMaterial,
  Points,
  PointMaterial,
  Plane,
  shaderMaterial,
} from "@react-three/drei";
import { TvModel } from "./components/Model2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { glsl } from "three/tsl";
import vShader from './shaders/vertex.glsl.ts'
import fShader from './shaders/fragment.glsl.ts'


function BackgroundColor() {
  const { scene } = useThree();
  // eslint-disable-next-line react-hooks/immutability
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
  status: boolean
}

function Primitive({ status }: ObjProps) {
  const i = 0.3;
  const j = 2.5;
  const ref = useRef<THREE.Mesh>(null!);

  const tl = gsap.timeline({repeat: -1})
  

  
  useFrame(({clock}) => {
    if (ref.current!) {
      ref.current.rotation.x = clock.elapsedTime / 10;
      ref.current.rotation.y = clock.elapsedTime / 10;
      ref.current.rotation.z = clock.elapsedTime / 10;
      if (status) {
        gsap.fromTo( ref.current.position, {y: ref.current.position.y}, {y: 0, duration: 2})
      }
      else {
        tl.to(ref.current.position, {y: -1, duration: 2})
        .to(ref.current.position, {y: 1, duration: 2})


      }
    }
  });
  return (
    <>
      <mesh ref={ref} position={[0, 1, 0]}>
        <icosahedronGeometry args={[9, 0]} />
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

function ShaderPlane() {
  

  return (<>

    <mesh rotation={[-Math.PI / 2,0,0]}>
      <planeGeometry args={[20,20,100,100]}/>
      <shaderMaterial vertexShader={vShader} fragmentShader={fShader} wireframe/>

    </mesh>
  
  </>)
}




function Scene() {
  const [animate, setAnimate] = useState(false);
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
          <ambientLight intensity={10} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />

          <ShaderPlane />

          <BackgroundColor />
          <gridHelper args={[30, 30, 30]}></gridHelper>
          <axesHelper args={[5]}></axesHelper>
        </Canvas>
      </div>
    </>
  );
}

export default Scene;
