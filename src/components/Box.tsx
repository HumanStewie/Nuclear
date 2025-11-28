import * as THREE from "three";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";

function Box(props: ThreeElements["mesh"]) {
  return (
    <Canvas>
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "#2f74c0"} />
      </mesh>
    </Canvas>
  );
}

export default Box;
