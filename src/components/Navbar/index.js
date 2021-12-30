import { useRef, useState, memo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
//import { useWindowSize, useAppContext } from '../../hooks';
import Monogram from '../Monogram';
import { navLinks } from './NavbarData';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useWindowSize, useAppContext } from '../../hooks';

import './index.css';
import classNames from 'classnames';
import useDarkMode from '../../useDarkMode';
import Toggle from '../Toggle';
import { lightTheme, darkTheme } from '../../theme';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { active } from 'promise-inflight';
import '../../i18n';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Navbar as ResponsiveNavbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
//import NavToggle from './NavToggle';
import Icon from '../Icon';


function Navbar(props) {

    const { menuOpen, dispatch } = useAppContext();
    const handleNavClick = () => {
        setHashKey(Math.random().toString(32).substr(2, 8));
      };
    
      const handleMobileNavClick = () => {
        handleNavClick();
        if (menuOpen) dispatch({ type: 'toggleMenu' });
      };



    var allLanguages = [{

        language: "English",
        lan: "en"
    },
    {
        language: "Hebrew",
        lan: "he"
    }];
    var prefLanguage = localStorage.getItem('prefferedLanguage');
    allLanguages.unshift(
        allLanguages.splice(
            allLanguages.findIndex(
                elt => elt.lan === prefLanguage
            ),
            1)[0]
    )

    const { t } = useTranslation();
    var prefLanguage = localStorage.getItem('prefferedLanguage');

    const [currentLanguage, setCurrentLanguage] = useState(prefLanguage);
    const [hasLanguageChanged, setHasLanguageChanged] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
    var ISMOBILE = window.innerWidth < 1200;

    //window.alert([...prefLangs]);

    const [languages, setLanguages] = useState(
        prefLanguage != null ?
            allLanguages

            :
            [{

                language: "English",
                lan: "en"
            },
            {
                language: "Hebrew",
                lan: "he"
            }]);

    //const { t } = useTranslation();

    const changeLanguage = (Lang, i) => {

        setHasLanguageChanged(true);
        i18next.changeLanguage(Lang);
        setCurrentLanguage(Lang);
        var lang = languages[i];
        var langs = languages;
        langs.unshift(lang);
        langs.splice(i + 1);
        //langs.shift(i+1);
        setLanguages([...langs]);
        localStorage.setItem('prefferedLanguage', lang.lan);
        setTimeout(() => {
            setHasLanguageChanged(false);

        }, 1000);


    }

    //const { menuOpen, dispatch } = useAppContext();
    const location = props;
    const [hashKey, setHashKey] = useState();
    const [isDropdown, setIsDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //const windowSize = useWindowSize();
    const navbarRef = useRef();
    //const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
    const EnglishNavLinks = navLinks.map(label => label).reverse();
    console.log(isMobile);
    return (
        <header className={classNames("navbar fixed-top", i18next.language)} >
            <RouterLink
                className="navbar__logo"
                to={{ pathname: '/', hash: '#intro', state: hashKey }}
                aria-label="Eliran Yihye - Full stack developer"
            >
                {/* <Monogram highlight /> */}
            </RouterLink>

            <ResponsiveNavbar collapseOnSelect expand="xl" variant={props.theme === 'Dark' ? "dark" : "light"}  className={classNames(ISMOBILE ? `navbar__nav--mobile ${isMenuOpen ? "open" : "close"}` : "navbar__nav--desktop", hasLanguageChanged ? "changed" : "false")}>
                <Container>
            <ResponsiveNavbar.Toggle className="navbar__toggle" aria-controls="navbarScroll" onClick={() => setIsMenuOpen(!isMenuOpen)}/>
                                <ResponsiveNavbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto">
                        <div className={ISMOBILE ? `navbar__nav-list-mobile` : "navbar__nav-list"}>
                            
                            {navLinks.map(({ label, pathname, hash }) => (
                                <NavLink
                                    exact
                                    className={classNames(ISMOBILE ? `navbar__mobile-nav-link  ${isMenuOpen ? "open" : "close"}` : "navbar__nav-link")}
                                    activeClassName="navbar__nav-link--active"
                                    key={label}
                                    //onClick={}
                                    to={{ pathname, hash, state: hashKey }}
                                >
                                    {t(label)}

                                </NavLink>
                            ))}
                            <Button variant={props.theme === 'Light' ? "dark" : "light"} className={classNames("changeTheme--", props.theme === 'Light' ? "dark" : "light")} onClick={() => props.toggleTheme()}>
                                {
                                    props.theme === 'Light' ?
                                        <SunIcon />
                                        :
                                        <MoonIcon />
                                }
                                {t(props.theme)}</Button>
                            <DropdownButton  variant={props.theme === 'Light' ? "dark" : "light"} className={classNames("dropdown-- ", isDropdown ? "langdrop-open" : "langdrop-closed")} id="dropdown--changeLanguage" title={t('Changelanguage')} onClick={() => setIsDropdown(true)} >
                                {languages.map((Lang, i) => (
                                    <Dropdown.Item className="dropdown-item" disabled={i == 0} key={i} active={i === 0 ? true : false} onClick={i === 0 ? undefined : () => {
                                        props.switchLanguage(); changeLanguage(Lang.lan, i);
                                    }}>{t(Lang.language)}</Dropdown.Item>
                                ),
                                )}
                            </DropdownButton>
                        </div>
                        </Nav>
 
                </ResponsiveNavbar.Collapse>
                </Container>

            </ResponsiveNavbar>
        </header>
    );


}
export default memo(Navbar);
