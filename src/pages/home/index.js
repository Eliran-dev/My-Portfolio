
import { Fragment, useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion, useRouteTransition } from '../../hooks';
import { Transition } from "react-transition-group";
import { Helmet } from "react-helmet";
import './index.css';
import { useHistory, Route, Redirect, Router } from "react-router-dom";
import Intro from './intro';

const disciplines = ['Developer', 'Creator', 'Animator', 'Illustrator', 'Musician'];

const Home = () => {
    const { status } = useRouteTransition();
    const { hash, state } = useLocation();
    const initHash = useRef(true);
    const [visibleSections, setVisibleSections] = useState([]);
    const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
    const intro = useRef();  
    const portfolioWebsite = useRef();
    const smartHomeApp = useRef();
    const about = useRef();
    const prefersReducedMotion = usePrefersReducedMotion();

    
  
        useEffect(() => {
          // const hasEntered = status === 'entered';
          // const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
          // let scrollObserver;
          // let scrollTimeout;
      
          // const handleHashchange = (hash, scroll) => {
          //   clearTimeout(scrollTimeout);
          //   const hashSections = [intro, portfolioWebsite, smartHomeApp, about];
          //   const hashString = hash.replace('#', '');
          //   // const element = hashSections.filter(item => item.current.id === hashString)[0];
          //   // if (!element) return;
          //   // const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
          //   // const top  = element.current.offsetTop;
      
   
          //   if (supportsNativeSmoothScroll) {
          //     window.scroll({
          //       top,
          //       left: 0,
          //       behavior,
          //     });
          //   } else {
          //     window.scrollTo(0, top);
          //   }
          // };
      
          // if (hash && initHash.current && hasEntered) {
          //   handleHashchange(hash, false);
          //   initHash.current = false;
          // } else if (!hash && initHash.current && hasEntered) {
          //   window.scrollTo(0, 0);
          //   initHash.current = false;
          // } else if (hasEntered) {
          //   handleHashchange(hash, true);
          // }
        });
      

return (
  <div className="home">
    <Helmet>
      <title>Eliran Yihye | Programmer + web developer</title>
    </Helmet>
    
    <Intro
    id="intro"
    sectionRef={intro}
    disciplines={disciplines}
    scrollIndicatorHidden={scrollIndicatorHidden}>

    </Intro>


  </div>
);
};
export default Home;