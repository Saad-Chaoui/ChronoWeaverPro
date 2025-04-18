import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const BackgroundAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const frameId = useRef<number | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle window resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    // Create particle field
    const createParticleField = () => {
      // Generate a field of particles
      const particleCount = isMobile ? 1500 : 3000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const primaryColor = new THREE.Color(0x0aeeff); // Cyan
      const secondaryColor = new THREE.Color(0xff2a6d); // Pink
      const accentColor = new THREE.Color(0xff9e1b); // Amber

      // Distribute particles in a 3D space
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Position
        positions[i3] = (Math.random() - 0.5) * 50; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 50; // y
        positions[i3 + 2] = (Math.random() - 0.5) * 50 - 10; // z (shifted back)

        // Color
        const colorRand = Math.random();
        let particleColor: THREE.Color;
        
        if (colorRand < 0.6) {
          particleColor = primaryColor;
        } else if (colorRand < 0.9) {
          particleColor = secondaryColor;
        } else {
          particleColor = accentColor;
        }
        
        colors[i3] = particleColor.r;
        colors[i3 + 1] = particleColor.g;
        colors[i3 + 2] = particleColor.b;
        
        // Size variation (smaller on mobile)
        sizes[i] = Math.random() * (isMobile ? 0.1 : 0.2) + 0.05;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create point material with custom shader
      const pointsMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            // Create a circular particle with soft edges
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float radius = length(xy);
            float alpha = 1.0 - smoothstep(0.3, 0.5, radius);
            // Apply color with falloff
            gl_FragColor = vec4(vColor, alpha * 0.7);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        vertexColors: true
      });

      const points = new THREE.Points(particles, pointsMaterial);
      scene.add(points);
      pointsRef.current = points;
    };

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      
      if (pointsRef.current) {
        // Rotate particle field slowly 
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.x += 0.0002;
        
        // Mouse-based interaction - subtle parallax effect
        pointsRef.current.rotation.x += (mousePosition.current.y * 0.0005 - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y += (mousePosition.current.x * 0.0005 - pointsRef.current.rotation.y) * 0.05;
        
        // Subtle "breathing" animation
        const time = Date.now() * 0.0005;
        pointsRef.current.scale.x = 1 + Math.sin(time) * 0.03;
        pointsRef.current.scale.y = 1 + Math.sin(time) * 0.03;
        pointsRef.current.scale.z = 1 + Math.sin(time) * 0.03;
      }
      
      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Set up the scene
    createParticleField();
    animate();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (pointsRef.current && sceneRef.current) {
        sceneRef.current.remove(pointsRef.current);
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full z-[-1] opacity-60 pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.9) 70%)'
      }}
    />
  );
};

export default BackgroundAnimation;