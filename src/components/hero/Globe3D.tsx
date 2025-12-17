import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// African country pins with positions (lat/long converted to 3D)
const africaPins = [
  { name: 'Tanzania', color: '#F97316', lat: -6.369, lng: 34.888, primary: true },
  { name: 'Kenya', color: '#FCD34D', lat: -1.286, lng: 36.817, primary: false },
  { name: 'South Africa', color: '#0891B2', lat: -30.559, lng: 22.937, primary: false },
  { name: 'Egypt', color: '#F59E0B', lat: 26.820, lng: 30.802, primary: false },
  { name: 'Nigeria', color: '#10B981', lat: 9.082, lng: 8.675, primary: false },
  { name: 'Morocco', color: '#A855F7', lat: 31.792, lng: -7.092, primary: false },
  { name: 'Ethiopia', color: '#F87171', lat: 9.145, lng: 40.489, primary: false },
  { name: 'Ghana', color: '#84CC16', lat: 7.946, lng: -1.023, primary: false },
];

// Convert lat/lng to 3D position
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Wireframe Globe component
function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial 
        color="#0891B2" 
        wireframe 
        transparent 
        opacity={0.3}
      />
    </mesh>
  );
}

// Glowing Africa outline (simplified as a highlighted region)
function AfricaHighlight() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.4;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  // Create a partial sphere to highlight Africa region
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2.02, 32, 32, 
      Math.PI * 0.8, // phiStart - starting from Africa's longitude
      Math.PI * 0.6, // phiLength
      Math.PI * 0.2, // thetaStart
      Math.PI * 0.6  // thetaLength
    );
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial 
        color="#F97316" 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Location Pin component
function LocationPin({ position, color, name, primary }: { 
  position: THREE.Vector3; 
  color: string; 
  name: string;
  primary: boolean;
}) {
  const pinRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pinRef.current) {
      // Pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.2;
      pinRef.current.scale.setScalar(primary ? scale * 1.2 : scale);
    }
    if (glowRef.current) {
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={pinRef} position={position}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
        {/* Core pin */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* Label on hover - always visible for primary */}
        {primary && (
          <Html position={[0, 0.3, 0]} center distanceFactor={8}>
            <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs whitespace-nowrap border border-safari/30">
              {name}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

// Particle system
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 800;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FCD34D"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main Scene
function Scene() {
  const { viewport } = useThree();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#F97316" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#0891B2" />

      {/* Globe */}
      <group scale={viewport.width > 10 ? 1.2 : 0.9}>
        <WireframeGlobe />
        <AfricaHighlight />
        
        {/* Location Pins */}
        {africaPins.map((pin) => (
          <LocationPin
            key={pin.name}
            position={latLngToVector3(pin.lat, pin.lng, 2.1)}
            color={pin.color}
            name={pin.name}
            primary={pin.primary}
          />
        ))}
        
        {/* Particles */}
        <ParticleField />
      </group>

      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-safari/30 border-t-safari rounded-full animate-spin" />
    </div>
  );
}

// Main Globe3D component
export default function Globe3D() {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
