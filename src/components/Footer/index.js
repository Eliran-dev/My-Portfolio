import { socialLinks } from "./FooterData";
import Icon from "../Icon";
import './index.css';
import { blurOnMouseUp } from "../../utils/focus";
import { Transition } from "react-transition-group";

const FooterIcons = () => (
    <Transition>
    <div className="Footer_icons">
        {socialLinks.map(({ label, url, icon }) => (
            <a
                key={label}
                className=""
                aria-label={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseUp={blurOnMouseUp}
            >
                {label}
                <Icon className="navbar__nav-icon" icon={icon}/>
            </a>
        ))}
    </div>
    </Transition>
);

const Footer = () => {
    return(
        <FooterIcons />
    )
}
export default Footer