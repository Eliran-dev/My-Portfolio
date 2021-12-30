import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState('Light');
    const [componentMounted, setComponentMounted] = useState(false);

    const setThemeMode = (mode) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    };

    const toggleTheme = () => {
        theme === 'Light' ?
        setThemeMode('Dark')
        :
        setThemeMode('Light')

    }


useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
   !localTheme ?
    setThemeMode('Light') :
    localTheme ? 
    setTheme(localTheme) :
    setThemeMode('Light');


    setComponentMounted(true);
    
}, []);

return [theme, toggleTheme, componentMounted]
};
export default useDarkMode;