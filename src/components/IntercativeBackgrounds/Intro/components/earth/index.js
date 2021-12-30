import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
//import { SphereGeometry } from 'three';
import EarthCloudsMap from '../../../../../assets/Earth/8k_earth_clouds.jpg';
import EarthDayMap from '../../../../../assets/Earth/8k_earth_daymap.jpg';
import EarthNightMap from '../../../../../assets/Earth/8k_earth_nightmap.jpg';
import EarthNormalMap from '../../../../../assets/Earth/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../../../../assets/Earth/8k_earth_specular_map.jpg';
import * as THREE from 'three';
import useDarkMode from '../../../../../useDarkMode';
import classNames from 'classnames';





const Earth = (props) => {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const earthRef =  useRef();
    const cloudsRef = useRef();
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        const calcSpeed = (speed) => {
           var realSpeed = 
            speed > 0 ? 
            (elapsedTime/6) + speed :
            speed
            return realSpeed;
        }
        var currentSpeedY = calcSpeed(props.speedY);
        var currentSpeedX = calcSpeed(props.speedX);
        cloudsRef.current.rotation.y = currentSpeedY;
        earthRef.current.rotation.y = currentSpeedY;
        cloudsRef.current.rotation.x = currentSpeedX;
        earthRef.current.rotation.x = currentSpeedX;


    })
    


    const [colorMap, normalMap, specularMap, cloudsMap] = 
    useLoader(THREE.TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);

    return (
    <>
    
    <ambientLight />
    {
    theme === 'Dark' ? 
        <Stars />
        :
        console.log('no starts')
    }
    <mesh ref={cloudsRef} position={[0, 0, 3]} >
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
        map={cloudsMap}
        opacity={0.4}
        depthWrite={true}
        transparent={true}
        side={THREE.DoubleSide}
        />

    </mesh>
    <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} color="blue" />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} />

    </mesh>
    </>
    );

}
 
export default Earth;