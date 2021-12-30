import React from 'react'
import { Button } from 'react-bootstrap';

const Toggle = ({theme, toggleTheme}) => {
    const isDarkMode = theme === 'Dark';
    console.log(theme);
    return (
        <Button variant={theme === 'Light' ? 'dark' : 'light'} onClick={toggleTheme} />

    );

};


export default Toggle;
