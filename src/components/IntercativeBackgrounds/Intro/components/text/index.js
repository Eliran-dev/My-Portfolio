import React from 'react';
import { Canvas } from '@react-three/fiber'; 
import * as THREE from 'three';


const text = new THREE.FontLoader().parse("I am Eliran");
const textOptions = {
    text,
    size: 5,
    height: 1
  };
const Text = (textOptions) => {

    return (
        <Canvas
          style={{ height: '100vh', width: '100vw' }} // stretch the canvas to the full viewport size
        >
          <mesh>
            <textGeometry attach='geometry' args={['three.js', textOptions]} />
            <meshStandardMaterial attach='material' />
          </mesh>
        </Canvas>
      );
    }

    export default Text;