import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const BLUE = '#0066FF';
const CYAN = '#0284C7';
const DEEP_NAVY = '#0B1938';

// Custom High-DPI Procedural Canvas Texture rendering "AI" on cube faces
const useAICubeTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#0052CC');
    grad.addColorStop(0.5, '#0066FF');
    grad.addColorStop(1, '#0284C7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 236, 236);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(16, 16, 12, 12);
    ctx.fillRect(228, 16, 12, 12);
    ctx.fillRect(16, 228, 12, 12);
    ctx.fillRect(228, 228, 12, 12);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 100px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 8;
    ctx.fillText('AI', 128, 120);

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('CORE', 128, 190);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
};

// 1. Ultra-Lightweight Neural Synapse Network (Pre-computed graph edges for ZERO CPU overhead)
const NeuralSynapseNetwork = () => {
  const groupRef = useRef();

  const nodeCount = 20;

  // Pre-generate nodes and pre-computed fixed edges once (O(1) runtime)
  const { positions, lineGeometry } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const nodeCoords = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.3 + (i % 3) * 0.4;
      const theta = (i / nodeCount) * Math.PI * 2 + (i % 2) * 0.5;
      const phi = Math.acos(((i * 2) / nodeCount) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodeCoords.push({ x, y, z });
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Connect each node to nearest 2 neighbors statically
    const linePoints = [];
    for (let i = 0; i < nodeCount; i++) {
      const next1 = (i + 1) % nodeCount;
      const next2 = (i + 3) % nodeCount;
      linePoints.push(nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z);
      linePoints.push(nodeCoords[next1].x, nodeCoords[next1].y, nodeCoords[next1].z);
      linePoints.push(nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z);
      linePoints.push(nodeCoords[next2].x, nodeCoords[next2].y, nodeCoords[next2].z);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));

    return { positions: pos, lineGeometry: lineGeo };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.08 + state.pointer.x * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.08 - state.pointer.y * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Node Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#60A5FA"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Static Fast Synapse Wireframe Geometry */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

// 2. Central High-Tech AI Tensor Core
const AITensorCore = () => {
  const cubeRef = useRef();
  const innerRef = useRef();
  const ringXRef = useRef();
  const ringYRef = useRef();
  const aiTexture = useAICubeTexture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.15;
      cubeRef.current.rotation.y = t * 0.22;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.25;
      innerRef.current.rotation.y = -t * 0.35;
    }
    if (ringXRef.current) {
      ringXRef.current.rotation.x = t * 0.3;
      ringXRef.current.rotation.y = t * 0.1;
    }
    if (ringYRef.current) {
      ringYRef.current.rotation.z = -t * 0.25;
      ringYRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <group>
      {/* Glowing AI Core with Brand Texture */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          map={aiTexture}
          roughness={0.2}
          metalness={0.8}
          emissive={BLUE}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Outer Holographic Glass Cage */}
      <mesh>
        <boxGeometry args={[1.36, 1.36, 1.36]} />
        <meshPhysicalMaterial
          color={CYAN}
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={0.4}
        />
      </mesh>

      {/* Cyber Wireframe Cage */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Glowing Crystal */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Orbital Gimbal Rings */}
      <mesh ref={ringXRef}>
        <torusGeometry args={[1.9, 0.02, 12, 48]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh ref={ringYRef}>
        <torusGeometry args={[2.2, 0.018, 12, 48]} />
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// 3. Orbiting Microservice Pods
const MicroserviceBlocks = () => {
  const blocks = useMemo(() => [
    { pos: [2.5, 1.2, 0.5], size: 0.28, color: '#38BDF8', label: 'API' },
    { pos: [-2.4, -1.1, 0.8], size: 0.32, color: '#60A5FA', label: 'DB' },
    { pos: [1.8, -2.0, -0.6], size: 0.3, color: '#00F0FF', label: 'RAG' },
    { pos: [-1.9, 1.8, -0.8], size: 0.26, color: '#3B82F6', label: 'LLM' },
  ], []);

  return (
    <group>
      {blocks.map((b, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={b.pos}>
            <boxGeometry args={[b.size, b.size, b.size]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    // Pause Three.js render loop when Hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#FFFFFF" />
        <pointLight position={[-10, -8, -5]} intensity={1.8} color={BLUE} />
        <pointLight position={[8, 6, 6]} intensity={1.4} color={CYAN} />

        <Suspense fallback={null}>
          <group position={[2.1, 0, 0]}>
            <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.3}>
              <NeuralSynapseNetwork />
              <AITensorCore />
              <MicroserviceBlocks />
            </Float>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;