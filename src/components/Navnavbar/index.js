import { useRef, useState, memo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
//import { useWindowSize, useAppContext } from '../../hooks';
import Monogram from '../Monogram';
import { navLinks, socialLinks } from './NavbarData';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
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
import { Navbar as Navi } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


const NavbarIcons = () => (
    <div className="navbar__nav-icons">
        {socialLinks.map(({ label, url, icon }) => (
            <a
                key={label}
                className="navbar__nav-icon-link"
                aria-label={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        ))}
    </div>
);

function Navbar(props) {
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
    //const windowSize = useWindowSize();
    const navbarRef = useRef();
    //const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
    const EnglishNavLinks = navLinks.map(label => label).reverse();
    return (

            <Navi>
    <Navi.Brand href="#home">Navbar with text</Navi.Brand>
    <Navi.Collapse className="justify-content-end">
      <Navi.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navi.Text>
    </Navi.Collapse>
</Navi>

    );


}
export default memo(Navbar);
