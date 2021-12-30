import classNames from 'classnames';
import React from 'react';
import { Helmet } from "react-helmet";
import './index.css';
import { ReactSVG } from 'react-svg';
import ReactLogo from '../../assets/programminglogos/react.svg';
import JSLogo from '../../assets/programminglogos/javascript.svg';
import NodejsLogo from '../../assets/programminglogos/node-js.svg';
import FirebaseLogo from '../../assets/programminglogos/firebase.svg';
import BoostrapLogo from '../../assets/programminglogos/bootstrap.svg';
import CLogo from '../../assets/programminglogos/c.svg';
import { useTranslation } from 'react-i18next';
import projects from '../projects/projectsData';

const Logos = [
    {
        Logo: ReactLogo, Logolabel: "react"
    },
    {
        Logo: JSLogo, Logolabel: "javascript"

    },
    {
        Logo: NodejsLogo, Logolabel: "node-js"
    },
    {
        Logo: FirebaseLogo, Logolabel: "firebase"
    },
    {
        Logo: BoostrapLogo, Logolabel: "bootstrap"
    },
    {
        Logo: CLogo, Logolabel: "C"
    }
];

const FindLogo = (label) => {
    var i = Logos.findIndex(i => i.Logolabel === label)
    return Logos[i].Logo
}
const ProjectPage = ({ key, title, websiteLink, img, imgTitle, langs, about }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className={classNames("project", `${title}`)}
            key={key}
        >
            <Helmet>
                <title tag="title">{title}</title>
            </Helmet>
            <img className={classNames("image", `${title}`)} src={img} alt={imgTitle} />
            <h1 className="title">{title}</h1>
            <a href={"https://"+websiteLink}           target='_blank'
          rel="noopener">{websiteLink}</a>
            <div className="languages">
                {langs.map((label) => (
                    <ReactSVG
                        beforeInjection={(svg) => {
                            svg.classList.add('svg-class')
                            svg.setAttribute('style', 'width: 8vh; height: 64px;  margin-top: 25px')
                        }}
                        src={FindLogo(label)} />
                ))}
            </div>
            <div className="textAboutTheProject">
                <h3>{t(`Projects.${title}.about`)}</h3>
            </div>
        </div>
    )
};

export default ProjectPage;