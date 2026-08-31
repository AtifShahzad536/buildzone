import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const BLUE = '#0066FF';
const CYAN = '#0284C7';
const DEEP_NAVY = '#0B1938';

// Custom High-DPI Procedural Canvas Texture rendering "AI" on all 6 faces of the cube
const useAICubeTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. High-Tech Gradient Background matching BuildZone brand
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#0052CC');
    grad.addColorStop(0.5, '#0066FF');
    grad.addColorStop(1, '#0284C7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // 2. Outer Cyber Grid Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 14;
    ctx.strokeRect(18, 18, 476, 476);

    // 3. Tech Corner Accents
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(28, 28, 22, 22);
    ctx.fillRect(462, 28, 22, 22);
    ctx.fillRect(28, 462, 22, 22);
    ctx.fillRect(462, 462, 22, 22);

    // 4. Central Bold "AI" Typography
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 200px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 12;
    ctx.fillText('AI', 256, 245);

    // 5. Tech Engine Sub-Label
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('CORE', 256, 385);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
};

// 1. Dynamic Neural Synaptic Network (Interconnected AI Nodes & Live Data Conduits)
const NeuralSynapseNetwork = () => {
  const groupRef = useRef();
  const lineMeshRef = useRef();
  const pointsRef = useRef();

  const nodeCount = 70;
  const maxDistance = 1.9;

  // Initialize node positions & velocities in a compact, elegant sphere
  const [nodes, initialPositions, colors] = useMemo(() => {
    const arr = [];
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const c1 = new THREE.Color(BLUE);
    const c2 = new THREE.Color(CYAN);
    const c3 = new THREE.Color(DEEP_NAVY);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.2 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      arr.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        phase: Math.random() * Math.PI * 2
      });

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixed = Math.random() > 0.3 ? c1.clone().lerp(c2, Math.random()) : c3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [arr, pos, col];
  }, []);

  // Pre-allocate buffer for connecting lines
  const maxLines = (nodeCount * (nodeCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth continuous orbit + subtle cursor parallax
      groupRef.current.rotation.y = t * 0.08 + state.pointer.x * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 - state.pointer.y * 0.18;
    }

    // Animate individual neural nodes
    let lineIdx = 0;
    const posAttr = pointsRef.current?.geometry?.attributes?.position;

    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i];
      node.x = node.ox + Math.sin(t * 0.8 + node.phase) * 0.15;
      node.y = node.oy + Math.cos(t * 0.7 + node.phase) * 0.15;
      node.z = node.oz + Math.sin(t * 0.6 + node.phase) * 0.15;

      if (posAttr) {
        posAttr.setXYZ(i, node.x, node.y, node.z);
      }
    }
    if (posAttr) posAttr.needsUpdate = true;

    // Connect nearby nodes with neural synapse lines
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const alpha = 1.0 - dist / maxDistance;
          
          linePositions[lineIdx * 6] = nodes[i].x;
          linePositions[lineIdx * 6 + 1] = nodes[i].y;
          linePositions[lineIdx * 6 + 2] = nodes[i].z;

          linePositions[lineIdx * 6 + 3] = nodes[j].x;
          linePositions[lineIdx * 6 + 4] = nodes[j].y;
          linePositions[lineIdx * 6 + 5] = nodes[j].z;

          lineColors[lineIdx * 6] = 0.0;
          lineColors[lineIdx * 6 + 1] = 0.4 * alpha;
          lineColors[lineIdx * 6 + 2] = 1.0 * alpha;

          lineColors[lineIdx * 6 + 3] = 0.0;
          lineColors[lineIdx * 6 + 4] = 0.5 * alpha;
          lineColors[lineIdx * 6 + 5] = 0.8 * alpha;

          lineIdx++;
        }
      }
    }

    if (lineMeshRef.current) {
      lineMeshRef.current.geometry.attributes.position.needsUpdate = true;
      lineMeshRef.current.geometry.attributes.color.needsUpdate = true;
      lineMeshRef.current.geometry.setDrawRange(0, lineIdx * 2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Neural Nodes (Synapse Points) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={initialPositions.length / 3}
            array={initialPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* 2. Synaptic Data Lines */}
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

// 2. Central 3D AI Tensor Core with "AI" clearly branded on all 4/6 faces
const AITensorCore = () => {
  const cubeRef = useRef();
  const outerWireRef = useRef();
  const torusRef1 = useRef();
  const torusRef2 = useRef();
  const aiTexture = useAICubeTexture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.y = t * 0.35;
      cubeRef.current.rotation.x = Math.sin(t * 0.2) * 0.18;
    }
    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = -t * 0.25;
      outerWireRef.current.rotation.z = t * 0.2;
    }
    if (torusRef1.current) {
      torusRef1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.35) * 0.15;
      torusRef1.current.rotation.y = t * 0.35;
    }
    if (torusRef2.current) {
      torusRef2.current.rotation.y = -t * 0.3;
      torusRef2.current.rotation.z = Math.PI / 4 + Math.cos(t * 0.25) * 0.12;
    }
  });

  return (
    <group>
      {/* Central Solid AI Cube with "AI" clearly visible on all 6 faces */}
      <mesh ref={cubeRef} scale={[0.88, 0.88, 0.88]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          map={aiTexture}
          emissive="#002966"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Holographic Blueprint Wireframe Shell */}
      <mesh ref={outerWireRef} scale={[1.2, 1.2, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          wireframe
          color={BLUE}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Orbiting Quantum Neural Ring 1 */}
      <mesh ref={torusRef1} scale={[1.65, 1.65, 1.65]}>
        <torusGeometry args={[1, 0.014, 16, 64]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.65} />
      </mesh>

      {/* Orbiting Quantum Neural Ring 2 */}
      <mesh ref={torusRef2} scale={[1.95, 1.95, 1.95]}>
        <torusGeometry args={[1, 0.01, 16, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// 3. Orbiting Microservice Pods & Code Data Blocks
const MicroserviceBlocks = () => {
  const groupRef = useRef();

  const blocks = useMemo(() => [
    { pos: [1.4, 0.9, 0.5], size: 0.18, color: BLUE },
    { pos: [-1.5, -0.8, 0.6], size: 0.15, color: CYAN },
    { pos: [1.1, -1.3, -0.4], size: 0.19, color: DEEP_NAVY },
    { pos: [-1.2, 1.2, -0.5], size: 0.16, color: BLUE },
    { pos: [0.2, 1.6, 0.7], size: 0.14, color: CYAN },
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((b, i) => (
        <Float key={i} speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
          <mesh position={b.pos}>
            <boxGeometry args={[b.size, b.size, b.size]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${
      isMobile ? 'opacity-25' : 'opacity-100'
    }`}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8.0 : 7.5], fov: isMobile ? 50 : 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#FFFFFF" />
        <pointLight position={[-10, -8, -5]} intensity={1.8} color={BLUE} />
        <pointLight position={[8, 6, 6]} intensity={1.4} color={CYAN} />

        <Suspense fallback={null}>
          {/* Responsive position: Ambient subtle background on mobile, crisp 3D showcase on desktop */}
          <group 
            position={isMobile ? [0, 0.2, -1.0] : [2.1, 0, 0]} 
            scale={isMobile ? [0.85, 0.85, 0.85] : [1, 1, 1]}
          >
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
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