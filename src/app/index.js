import { lazy, Suspense, createContext, useReducer, Fragment, useState } from 'react';
import { BrowserRouter, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
//import ThemeProvider from '../components/ThemeProvider';
import { initialState, reducer } from './reducer';
import { reflow } from '../utils/transition';
import { msToNum } from '../utils/style';
import { tokens } from '../components/ThemeProvider/theme';
import VisuallyHidden from '../components/VisuallyHidden';
import { lightTheme, darkTheme, heLanguage, enLanguage } from '../theme';
import GlobalStyles from '../global';
import './index.css';
import useDarkMode from '../useDarkMode';
import { ThemeProvider } from 'styled-components';
import projects from '../components/projects/projectsData';

const Page404 = lazy(() => import('../pages/404'));
const HomePage = lazy(() => import('../pages/home'));
const ContactPage = lazy(() => import('../pages/contact'));
const Projects = lazy(() => import('../pages/projects'));
const ProjectPage = lazy(() => import('../components/project'));
const kindleMailer = lazy(() => import('../pages/projects/KindleMailer'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContext.Provider>
  );
};
const AppRoutes = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') != null ? localStorage.getItem('theme') : 'Light');
  const setThemeMode = (theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme);

  }
  const toggleTheme = () => {
    theme === 'Light' ?
      setThemeMode('Dark')
      :
      setThemeMode('Light')

  }
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('prefferedLanguage'));
  const switchLanguage = () => {
    currentLanguage === "he" ?
      setCurrentLanguage("en")
      :
      setCurrentLanguage("he")
  }
  const location = useLocation();
  const { pathname } = location;
  const [componentMounted] = useDarkMode();
  //const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  if (!componentMounted) {
    return <div />
  };

  return (
    <ThemeProvider theme={theme === 'Light' ? lightTheme : darkTheme}>
      <Fragment>
        <Helmet>
        <title>Contact | Eliran Yihye</title>

          <link rel="canonical" href={`https://elirany.com${pathname}`} />
        </Helmet>
        <VisuallyHidden showOnFocus as="a" className="skip-to-main" href="#MainContent">
          Skip to main content
        </VisuallyHidden>
        <GlobalStyles language={currentLanguage === 'he' ? heLanguage : enLanguage} />
        <Navbar className="navbar" location={location} theme={theme} toggleTheme={toggleTheme} switchLanguage={switchLanguage} />
        <TransitionGroup component="main" className="app" tabIndex={-1} id="MainContent">
          <Transition
            key={pathname}
            timeout={msToNum(tokens.base.durationS)}
            onEnter={reflow}
          >
            {status => (
              <TransitionContext.Provider value={{ status }}>
                <div className={classNames('app__page', `app__page--${status}`, `app__page--${currentLanguage}`)}>
                  <Suspense fallback={<Fragment />}>
                    <Switch location={location}>
                      <Route exact path="/" component={HomePage} />
                      <Route path="/contact" component={ContactPage} />
                      <Route
                        exact
                        path="/projects"
                        render={(props) => (
                          <Projects {...props} theme={theme} language={currentLanguage} />
                        )}>
                      </Route>
                      <Route
                    exact
                    path="/Udemycertification"
                    render={() => {
                      (window.location = "https://ude.my/UC-VBI9Q2U2")                    }}
                />
                      
                      {projects.map((project, index) => (
                        <Route exact path={`/projects/${project.title}`} render={() =>
                        <ProjectPage
                          key={index}
                          title={project.title}
                          websiteLink={project.websiteLink}
                          img={theme === 'Light' ? project.imgDark : project.img}
                          imgTitle={project.imgTitle}
                          langs={project.langs}
                        />} />
                      ))}


                      <Route component={Page404} />
                    </Switch>
                  </Suspense>
                </div>
              </TransitionContext.Provider>
            )}
          </Transition>
        </TransitionGroup>
        <Footer />
      </Fragment>
    </ThemeProvider>


  );
};
export default App;