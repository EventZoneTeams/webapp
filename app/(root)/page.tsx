"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { TextureLoader } from "three";
import * as THREE from "three";
import Header from "@/components/shared/Header";
import Link from "next/link";

function PhoneModel({ ...props }) {
  // Explicitly set the type of group as THREE.Group
  const group = useRef<THREE.Group | null>(null);
  const texture = useLoader(
    TextureLoader,
    "https://plus.unsplash.com/premium_photo-1664303684636-77e29786329b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 4) / 8;
      group.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Phone body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 4.8, 0.4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Phone screen */}
      <mesh position={[0, 0, 0.21]}>
        <planeGeometry args={[2.2, 4.6]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <Header />

      <main className="flex-1">
        <section className="mt-20 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
              <div className="space-y-4 text-center lg:w-1/2 lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  <span className="text-blue-400">Exciting</span>{" "}
                  <span className="text-purple-400">events</span>{" "}
                  <span className="text-pink-400">start from here.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:mx-0">
                  Create an event page, invite friends, and sell tickets. Host a
                  memorable event today.
                </p>
                <Link href="/discover" className="inline-block">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Discover now
                  </Button>
                </Link>
              </div>
              <div className="h-[600px] lg:w-1/2">
                <Canvas>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.15}
                      penumbra={1}
                    />
                    <PhoneModel />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="night" />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
