import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Scena({ rotation, ...props }) {
  const { nodes } = useGLTF('/Robot_V1.glb');
  const groupRef = useRef();

  // Estado para manejar si el modelo está siendo rotado por el usuario
  const [isRotating, setIsRotating] = useState(false);
  const [lastRotation, setLastRotation] = useState([0, 0, 0]);

  // Detecta si el mouse está en movimiento o no
  const handleMouseMove = (e) => {
    setIsRotating(true);  // El mouse está en movimiento
  };

  const handleMouseUp = () => {
    setIsRotating(false);  // El mouse dejó de moverse
  };

  // Rotación automática sobre el eje Z cuando el mouse no se mueve
  useFrame(() => {
    if (!isRotating && groupRef.current) {
      // Si el mouse no se mueve, el modelo rota lentamente sobre su eje Z
      groupRef.current.rotation.y += 0.01;  // Ajusta la velocidad de rotación
    }
  });

  // Restablecer la rotación del modelo al punto 0,0,0 cuando el mouse deja de moverse
  useEffect(() => {
    if (!isRotating && groupRef.current) {
      // Vuelve a la rotación original (esto puede ser opcional, dependiendo de tu necesidad)
      setLastRotation(groupRef.current.rotation.toArray());  // Guarda la última rotación antes de que empiece a girar
      groupRef.current.rotation.set(0, 0, 0);  // Reinicia la rotación en el eje Z
    }
  }, [isRotating]);

  return (
    <group
      ref={groupRef}
      {...props}
      rotation={rotation}
      onPointerMove={handleMouseMove} // Detectar movimiento del mouse
      onPointerUp={handleMouseUp}     // Detectar cuando se deja de mover
      dispose={null}
    >
      {/* Plataforma futurista (circular más pequeña con borde luminoso) */}
      <mesh position={[0, -0.5, 0]} scale={[1, 0.05, 1]}>
        <cylinderGeometry args={[1, 1, 0.1, 64]} />  {/* Forma circular con borde más definido */}
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} /> {/* Plata metálica */}
      </mesh>


      {/* Efecto de borde luminoso */}
      <mesh position={[0, -0.55, 0]}>
        <ringGeometry args={[1.5, 1.7, 64]} />
        <meshStandardMaterial emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>

      {/* Modelo del robot, ajustado para que "pise" el podio */}
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        position={[0, 0.25, 0]}  // Ajusta la altura del robot para que quede sobre el podio
        scale={[0.5, 0.5, 0.5]}  // Escala ajustada para que el robot sea más pequeño
      />

      {/* Iluminación futurista */}
      <ambientLight intensity={0.3} />

      {/* Luz direccional azul */}
      <directionalLight
        intensity={1}
        position={[10, 10, 10]}
        target={groupRef.current}
        castShadow
        color="#00FFFF"  // Luz azul para ambiente futurista
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Luz de relleno cian */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.8}
        color="#00FFFF"
        distance={10}
      />
    </group>
  );
}

useGLTF.preload('/Robot_V1.glb');
