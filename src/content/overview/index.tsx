import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import * as THREE from 'three';
import SidebarLayout from '../../../src/layouts/SidebarLayout';
import { useState, Suspense, useMemo, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { a, animated } from '@react-spring/three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { useLoader } from '@react-three/fiber';
import Link from 'next/link';
// import randomColor from 'randomcolor';
// import CameraControls from 'camera-controls';
import planetData from './planets';
import { useSpring } from 'react-spring';
// import Hero from './Hero';
import {
  Box,
  Button,
  Container,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  useTheme,
  Typography,
} from '@mui/material';
import {
  OrbitControls,
  Scroll,
  CameraShake,
  Billboard,
  Sphere,
} from '@react-three/drei';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Sun } from './planet';

const LandingContainer = styled(Container)(
  () => `
    max-width: 100%;
    align-items: center;
`,
);
const GridItemStyled = styled(Grid)(
  () => `
    position: absolute;
    align-items: center;
    top:35vh;
    left:80vw;
    @media only screen and (max-width: 900px) {
    top:10vh; 
    left:15vw;
    }
`,
);
const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`,
);
function Dialog({ dialogue, setSidebar, bottomRef }) {
  const theme = useTheme();
  const MenuCard = styled(Card)(
    () => `
    max-width: 200px;
    display:flex;
    flex-direction:column;
    align-items:center !important;
    justify-content:center !important;
    border: solid;
    border-color:${theme.colors.secondary.lighter};
    text-align:center;
    @media only screen and (max-width: 900px) {
    width:100%;    
    }
`,
  );
  const onClick = useCallback(() => {
    setSidebar(1);
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  let message: string;
  switch (dialogue) {
    case 0:
      message = 'Greetings and Welcome to the Triptych Laborare...';
      break;
    case 1:
      message = 'You are a made devman!!!';
      break;
    default:
      message = 'Follow us on Twitter to stay up to date with our expedition.';
      break;
  }
  return (
    <GridItemStyled
      item
      xs={12}
      style={{
        width: '100%',
        zIndex: 1,
      }}
    >
      <MenuCard>
        <CardContent>
          <Typography variant="h3">Triptych Laborare</Typography>
        </CardContent>
        <p style={{ fontSize: '1em' }}>{message}</p>
        <Divider />
        <CardContent>
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            color="secondary"
            onClick={onClick}
          >
            Explore
          </Button>
          <Link href={'/mint/artifacts'}>
            <Button sx={{ margin: 1 }} variant="contained" color="secondary">
              Mint Artifact
            </Button>
          </Link>
        </CardContent>
      </MenuCard>
    </GridItemStyled>
  );
}

function Logo() {
  const glb = useLoader(GLTFLoader, '/static/models/logo.gltf');
  const copiedGLTF = useMemo(() => glb.scene.clone(), [glb]);

  const logoRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const y = Math.sin(t);
    const z = -200 * Math.cos(t);
    // @ts-ignore
    logoRef.current.rotation.x -= 0.0;
    // @ts-ignore
    logoRef.current.rotation.z += 0.0;
    // @ts-ignore
    logoRef.current.rotation.y += 0.02;
  });

  return (
    <group rotation={[0, 0, 0]}>
      <a.primitive
        ref={logoRef}
        object={copiedGLTF}
        position={[0, 100, 0]}
        scale={10}
      />
    </group>
  );
}

function Satellite({ size }) {
  const obj = useLoader(OBJLoader, '/static/models/Juno.obj');
  const copiedScene = useMemo(() => obj.clone(), [obj]);
  const satRef = useRef();
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = 900 * Math.sin(t);
    const y = Math.sin(t);
    const z = -200 * Math.cos(t);
    // @ts-ignore
    satRef.current.position.x = x;
    // @ts-ignore
    satRef.current.position.y = y + 50;
    // @ts-ignore
    satRef.current.position.z = z;
    // @ts-ignore
    satRef.current.rotation.z += 0.02;
    // @ts-ignore
    satRef.current.rotation.y += 0.005;
    // @ts-ignore
    groupRef.current.rotation.x = Math.tan(t);
    // @ts-ignore
    groupRef.current.position.z = Math.tan(t);
    // @ts-ignore
    groupRef.current.position.y = Math.tan(t);
  });
  return (
    <group ref={groupRef} position={[80, 0, 60]} rotation={[0, 90, 0]}>
      <a.primitive
        ref={satRef}
        object={copiedScene}
        position={[90, 10, 70]}
        scale={size}
        rotation={[90, 0, 300]}
      />
    </group>
  );
}

function SpinningThing() {
  const ROW = 100;
  const COL = 100;
  const NUM = ROW * COL;
  const _obj = new THREE.Object3D();
  const instance = useRef();
  const scale = useMemo(
    //@ts-ignore
    () => new Array(NUM).fill().map(() => (Math.random() < 0.03 ? 3 : 1)),
    [],
  );
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() / 4;
    let id = 0;
    for (let y = 0; y < ROW; y += 1) {
      for (let x = 0; x < COL; x += 1) {
        const s = scale[id];
        _obj.scale.set(s, s, s);
        _obj.position.set(
          (x - COL / 2) / 3 - 5 + (Math.sin(x) * Math.PI) / 10,
          (y - ROW / 2) / 3 + 7 + (Math.cos(y) * Math.PI) / 10,
          -10 +
            (Math.cos((4 * Math.PI * (x - COL / 2)) / COL + time) +
              Math.sin((8 * Math.PI * (y - ROW / 2)) / ROW + time)) +
            0.2 *
              (Math.cos((12 * Math.PI * (x - COL / 2)) / COL + time) +
                Math.sin((17 * Math.PI * (y - ROW / 2)) / ROW + time)),
        );
        _obj.updateMatrix();
        //@ts-ignore
        instance.current.setMatrixAt(id, _obj.matrix);
        id += 1;
      }
    }
    //@ts-ignore
    instance.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <group position={[20, 10, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
      <instancedMesh ref={instance} args={[null, null, NUM]}>
        <octahedronBufferGeometry args={[0.02, 2, 2]} />
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  );
}

function Swarm({ count, ...props }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = 20 - Math.random() * 40;
      const y = 20 - Math.random() * 40;
      const z = Math.random() * -50 - 50;
      const speed = 0.01 + Math.random() / 1;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { z, speed } = particle;
      particle.z = z < 5 ? z + speed : Math.random() * -600;

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.updateMatrix();
      //@ts-ignore
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    //@ts-ignore
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} scale={30} args={[null, null, count]} {...props}>
      <boxBufferGeometry args={[0.045, 0.045, 0.045]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  );
}

function Overview() {
  const [landingJupiter, setLandingJupiter] = useState(0);
  const [explorationJupiter, setExplorationJupiter] = useState(0);
  const [dialogue, setDialogue] = useState(0);
  const [start, setStart] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const bottomRef = useRef(null);

  const [sidebar, setSidebar] = useState(0);

  return (
    <>
      <a
        href="https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '90px',
          height: '90px',
          background:
            "url('http://stfalcon.github.io/stopwar/img/stop-war-in-ukraine.png')",
          zIndex: 2013,
          border: 0,
        }}
        title="Do something to stop this war! Russians are killing our children and civilians!"
        target="_blank"
      />
      <div style={{ opacity: sidebar }}>
        {sidebar === 1 && <SidebarLayout />}
      </div>
      {sidebar === 0 && (
        <Dialog
          dialogue={dialogue}
          setSidebar={setSidebar}
          bottomRef={bottomRef}
        />
      )}
      <OverviewWrapper>
        <Helmet>
          <title>Triptych Laborare</title>
        </Helmet>
        <LandingContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <Parallax
              pages={2}
              style={{ top: '0', left: '0', right: '0', bottom: '0' }}
            >
              <ParallaxLayer offset={0} speed={2.5}>
                <Canvas
                  style={{ height: '98vh' }}
                  linear
                  camera={{ position: [0, 100, 300], fov: 90 }}
                >
                  <OrbitControls />
                  {
                    //@ts-ignore
                    <Billboard follow={true} lockX={false} lockY={false}>
                      {
                        //@ts-ignore
                        <Sphere />
                      }
                    </Billboard>
                  }
                  <Logo />
                  <Satellite size={0.5} />
                  <Sun
                    inst={0}
                    size={80}
                    toggle={explorationJupiter}
                    set={setExplorationJupiter}
                    dialogue={dialogue}
                    setDialogue={setDialogue}
                    bottomRef={bottomRef}
                    sidebar={sidebar}
                    setSidebar={setSidebar}
                  />
                  <Swarm count={1100} />
                  <CameraShake />
                </Canvas>
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0}>
                <Canvas
                  style={{ height: '98vh' }}
                  orthographic
                  camera={{
                    near: 1,
                    far: 40,
                    // position: [-30, -10, 10],
                    position: [-30, -10, 10],
                    zoom: 125,
                    fov: 100,
                  }}
                >
                  <SpinningThing />
                  <EffectComposer multisampling={0}>
                    <DepthOfField
                      target={[0, 0, 0]}
                      bokehScale={2}
                      focalLength={0.05}
                      width={400}
                      height={400}
                    />
                  </EffectComposer>
                  <CameraShake />
                </Canvas>
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0}>
                <div ref={bottomRef} />
              </ParallaxLayer>
            </Parallax>
          </Suspense>
        </LandingContainer>
      </OverviewWrapper>
    </>
  );
}

export default Overview;

