import reset from 'react-style-reset/string';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  #root {
    width: 100%;
    height: 100%;

    button {
      outline: none;
      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
  }

  body, html {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyles