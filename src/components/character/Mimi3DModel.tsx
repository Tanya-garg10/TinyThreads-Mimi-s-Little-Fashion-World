import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Mimi3DModelProps {
  nightMode: boolean;
}

export function Mimi3DModel({ nightMode }: Mimi3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const mimiGroupRef = useRef<THREE.Group | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Create Mimi character (cute 3D character)
    const mimiGroup = new THREE.Group();
    mimiGroupRef.current = mimiGroup;

    // Body (soft rounded shape)
    const bodyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0x9F7AEA : 0xFCD5CE,
      shininess: 30
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 1.2, 0.9);
    mimiGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0xE9D8FD : 0xFFE4E1,
      shininess: 30
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    mimiGroup.add(head);

    // Ears (bunny-style)
    const earGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const earMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0x9F7AEA : 0xFCD5CE,
      shininess: 30
    });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.3, 1.8, 0);
    leftEar.scale.set(1, 2, 1);
    mimiGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.3, 1.8, 0);
    rightEar.scale.set(1, 2, 1);
    mimiGroup.add(rightEar);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4A4A4A,
      shininess: 100
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.25, 0.5);
    mimiGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.25, 0.5);
    mimiGroup.add(rightEye);

    // Eye highlights (cute sparkles)
    const highlightGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const highlightMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100
    });

    const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight.position.set(-0.18, 1.27, 0.55);
    mimiGroup.add(leftHighlight);

    const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight.position.set(0.22, 1.27, 0.55);
    mimiGroup.add(rightHighlight);

    // Nose
    const noseGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0xF687B3 : 0xFFB6C1,
      shininess: 50
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.15, 0.55);
    mimiGroup.add(nose);

    // Cheeks (blush)
    const cheekGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const cheekMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0xF687B3 : 0xFFB6C1,
      shininess: 20,
      transparent: true,
      opacity: 0.6
    });

    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.35, 1.1, 0.45);
    leftCheek.scale.set(1, 0.7, 0.5);
    mimiGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.35, 1.1, 0.45);
    rightCheek.scale.set(1, 0.7, 0.5);
    mimiGroup.add(rightCheek);

    // Floating particles around Mimi
    const particleCount = 20;
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: nightMode ? 0xF687B3 : 0xFFD700,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      particle.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      );
      particle.userData = {
        originalY: particle.position.y,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      };
      particles.add(particle);
    }
    mimiGroup.add(particles);

    scene.add(mimiGroup);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      // Gentle floating animation
      mimiGroup.position.y = Math.sin(time * 1.5) * 0.1;
      
      // Gentle rotation
      mimiGroup.rotation.y += 0.005;

      // Mouse interaction with smooth interpolation
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
      
      mimiGroup.rotation.x += (targetRotationX - mimiGroup.rotation.x) * 0.05;
      mimiGroup.rotation.y += (targetRotationY - mimiGroup.rotation.y) * 0.05;

      // Animate particles
      particles.children.forEach((particle) => {
        const p = particle as THREE.Mesh;
        const userData = p.userData as { originalY: number; speed: number; offset: number };
        p.position.y = userData.originalY + Math.sin(time * userData.speed + userData.offset) * 0.2;
        p.rotation.x += 0.02;
        p.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [nightMode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-pointer"
      style={{ minHeight: '300px' }}
      aria-label="Interactive 3D Mimi character"
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm opacity-60">Loading Mimi in 3D...</div>
        </div>
      )}
    </div>
  );
}
