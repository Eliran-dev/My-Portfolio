
import { createGlobalStyle } from 'styled-components';
import i18next from 'i18next';
const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  Dropdown.Item {
  text-align: ${({isHebrew }) => isHebrew ? 'right' : 'left'};
  }
  .div {
    margin-left: auto; 
margin-right: 0;
  } 
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    padding: 0;
    margin: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    text-align: 
  }

  a {
    color: ${({ theme }) => theme.text};
  }
  a:hover {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    transition: opacity 300ms;
  }
  .navbar__nav-link:hover {
    color: ${({ theme }) => theme.text};

  }
  .input__field {
    text-align: ${({ language }) => language.input};

  }
  .input__label {
    right: ${({ language }) => language.input__label};
    transition: right 1500ms;
  }
  // .dropdown-item {
  //   ${({ theme }) => theme.dropdownButtons};
    
    
  // }
  .navbar__nav-icon {
    fill: ${({theme}) => theme.footerIcons};
    transition: fill .2s ease;
  }

`;
 export default GlobalStyles;
 //${({ theme }) => theme.body