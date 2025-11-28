import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import type {
  MathProps,
  ReactProps,
  EventHandlers,
  InstanceProps,
} from "@react-three/fiber";
import type {
  Mutable,
  Overwrite,
} from "@react-three/fiber/dist/declarations/src/core/utils";
import type { JSX } from "react/jsx-runtime";
import type { Group, Object3DEventMap } from "three";

export function Model(
  props?: JSX.IntrinsicAttributes &
    Mutable<
      Overwrite<
        Partial<
          Overwrite<
            Group<Object3DEventMap>,
            MathProps<Group<Object3DEventMap>> &
              ReactProps<Group<Object3DEventMap>> &
              Partial<EventHandlers>
          >
        >,
        Omit<InstanceProps<Group<Object3DEventMap>, Group>, "object">
      >
    >
) {
  const { nodes, materials } = useGLTF("/prototype1.gltf");
  return (
    <>
      <pointLight
        intensity={54.413}
        decay={2}
        position={[4.076, 5.904, -1.005]}
        rotation={[-1.839, 0.602, 1.932]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, 0, 0.042]}
        scale={1.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[0.887, 1.328 - 2.551, -0.526]}
        rotation={[0, 0, 1.571]}
        scale={0.054}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[0.887, 1.328 - 2.551, -0.165]}
        rotation={[0, 0, 1.571]}
        scale={0.054}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[0.887, 1.328 - 2.551, -0.165]}
        rotation={[0, 0, 1.571]}
        scale={0.054}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[0.887, 1.328 - 2.551, 0.533]}
        rotation={[0, 0, 1.571]}
        scale={0.054}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={nodes.Cylinder004.material}
        position={[0.887, 1.328 - 2.551, 0.172]}
        rotation={[0, 0, 1.571]}
        scale={0.054}
      />
    </>
  );
}

useGLTF.preload("/prototype1.gltf");
