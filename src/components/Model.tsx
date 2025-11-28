import { Float, useGLTF } from "@react-three/drei";

interface Props {
  position?: [];
}

export default function Model({ position }: Props) {
  useGLTF.preload("/public/scene.gltf");
  const gltf = useGLTF("/public/scene.gltf");
  return <primitive object={gltf.scene}></primitive>;
}
