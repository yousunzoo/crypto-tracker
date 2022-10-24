import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

* {
  box-sizing: border-box;
}

body {
  line-height: 1;  
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  transition : all 0.3s ease-in;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  text-decoration : none;
  color:inherit;
}
`;
const Togglebtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: 20px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.toggleColor};
  outline: none;
  border-radius: 10px;
  border-color: transparent;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.liHoverColor};
  }
  font-size: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  z-index: 1;
  span {
    display: block;
    font-size: 16px;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isDarkIcon, setIsDarkIcon] = useState("🌝");
  const toggleDark = () => {
    setIsDark((current) => !current);
    setIsDarkIcon((current) => (current === "🌝" ? "🌜" : "🌝"));
  };
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Togglebtn onClick={toggleDark}>
          <span>{isDarkIcon}</span>
        </Togglebtn>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;

// any 타입을 배제하려고 노력해야 한다.
// event : React.FormEvent<HTMLInputElement> => 어떤 타입 지정해야할지는 구글링!
// event에 타입을 지정해줘야 이벤트 함수 안의 오류를 체크할 수 있다.
// TS 에서는 event.target.value 보단 event.currentTarget.value를 사용한다.
