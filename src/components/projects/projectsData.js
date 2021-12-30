
import myportfolioEn from '../../assets/projects/myportfolio-En-project.jpeg';
import myportfolioDarkEn from '../../assets/projects/myportfolioDark-En-project.jpeg';
import myportfolioHe from '../../assets/projects/myportfolio-He.jpeg';
import myportfolioDarkHe from '../../assets/projects/myportfolioDark-He.jpeg';
import smartdoorlogin from '../../assets/projects/smartdoorlogin.jpeg';
const projects = [
    {
        id:0,
        title: "my-portfolio",
        type: "Website",
        websiteLink: "www.elirany.com",
        img: myportfolioEn,
        imgDark: myportfolioDarkEn,
        imgHe: myportfolioHe,
        imgDarkHe: myportfolioDarkHe,
        imgTitle: "my-portfolio website home screen",
        langs: [ "react", "javascript", "node-js",  "bootstrap", "firebase",],
    },
    {
        id:1,
        title: "Smart-door",
        type: "Mobile app",
        //websiteLink: "www.nextgennhome.com",
        img: smartdoorlogin,
        imgDark: smartdoorlogin,
        imgHe: smartdoorlogin,
        imgDarkHe: smartdoorlogin,
        imgTitle: "my-portfolio website home screen",
        langs: [ "react", "javascript", "bootstrap","firebase", "C"],
    },

];

export default projects;