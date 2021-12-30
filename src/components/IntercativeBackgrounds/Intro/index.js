import React, { useRef, useEffect, useState, Suspense, Fragment } from "react";
//import { Canvas, useFrame } from "react-three-fiber";
import { useInView } from "react-intersection-observer";
import { a, useTransition } from "@react-spring/web";
import { Html, useProgress, useGLTFLoader } from "@react-three/drei";
import classNames from "classnames";
import { reflow } from '../../../utils/transition';
import './index.css'; 
import { Transition } from "react-transition-group";
import { className } from "postcss-selector-parser";
import { Camera,Mesh, Material, MeshPhongMaterial, PerspectiveCamera, Scene, Sphere, SphereGeometry, sRGBEncoding, UniformsLib, UniformsUtils, Vector2, WebGLRenderer, WebGL1Renderer } from "three";
import { Canvas, useLoader,  } from "@react-three/fiber";
import Earth from "./components/earth";
import Navbar from "../../Navbar";
import skillsTour from "./components/skillsTour";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import useDarkMode from "../../../useDarkMode";
import Toggle from "../../Toggle";
import TextTrainsitions from "../../TextTrainsitions";
import Text from "./components/text";
// import * as THREE from 'three';
// import Desk from './components/desk/Desk';
// import Chair from './components/desk/Chair';
// import { OrbitControls } from "@react-three/drei";
const startTheTour = () => {
  
    return (
    <div className="touringLabel">
      <Transition
      key={'sss'}
      timeout={3000}
      onEnter={reflow}
      >
        {status => {
          <>
          <div className="foo">
          <h1>
            <TextTrainsitions text="Eliran Yihye" start={1} delay={500}></TextTrainsitions>
          </h1>
          </div>
          </>
        }}

      </Transition>
    </div>
  )
}


const IntroBackground = () =>  {


  var Languages = [
    {
      lanName: "cSharp",
      moveY: 2,
      moveX: 2,
      timer: 3000
    }
  ]; 
  const { innerWidth, innerHeight } = window;
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const [speedY, setSpeedY] = useState(0);
  const [speedX, setSpeedX] = useState(0);
  const [label, setLabel] = useState("");
  const Rotate = (sspeedY, sspeedX, timer) => {
    setSpeedY(sspeedY);
    setSpeedX(sspeedX);
    setTimeout(() => {
      setSpeedY(speedY +5);
      setSpeedX(speedX);
      
    }, timer);
  }

  const setText = (labell) => {
    setLabel(labell);
  }
  const StartIt = (Languages) => {
    for(var i=0; i < Languages.length; i++)
    {
      console.log("efewf" + Languages[i]);
      console.log(Languages[i].lanName);
      setLabel(Languages[i].lanName);
      Rotate(Languages[i].moveY, Languages[i].moveX, Languages[i].timer);
      
    }
  }

  
  return (
    <div className="canvasContainer"> 
      {/* <Canvas className="canvas">
      <ambientLight intensity={0.5} />



        <Suspense fallback={null}>
          <Desk />
          <Chair />
        </Suspense>
        <OrbitControls></OrbitControls>
      </Canvas> */}
      <div className="foo">
        {/* <Button variant={theme == 'Light' ? 'dark' : 'light'} onClick={() => StartIt(Languages)}> Start the tour</Button> */}
      </div>
      <div className="foo fooe">
      </div>
      </div>
  )
}


  export default IntroBackground;