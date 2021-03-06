/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three';
import Map from '../../../../../assets/desktop/ChairTextures/textures/12_lambert108SG_Diffuse.png';
import NormalMap from '../../../../../assets/desktop/ChairTextures/textures/12_lambert108SG_Normal.png';

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/12.gltf')
  const [normal, m] = 
  useLoader(THREE.TextureLoader, [NormalMap, Map]);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.polySurface379.geometry} material={materials.VRayMtl1SG} map={m}  normalMap={normal}/>
      <mesh geometry={nodes.polySurface375.geometry} material={materials.VRayMtl4SG} />
    </group>
  )
}

useGLTF.preload('/12.gltf')
