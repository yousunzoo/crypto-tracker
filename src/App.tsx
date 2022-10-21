import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;

// 똑같은 styled-component를 사용해도 props가 다르면 react에서 알아서 각 컴포넌트마다 고유한 className 부여

// styled.div`` => 기본 사용방법
// props를 사용해서 각 컴포넌트마다 다르게 부여할 속성 지정가능 => background-color : ${(props) => props.bgColor}
// styled(Box)`` => Box의 속성을 다 들고 와줌.

// 컴포넌트의 태그를 바꾸고 싶은데 스타일은 바꾸고 싶지 않을 때 => 컴포넌트 안에 `as="header"` 작성

// animation
// pseudo
// component style 안에 component 안에 있는 다른 element에 target 처리 해줘서 스타일 적용할 수 있다.
// 꼭 모든 태그를 컴포넌트 처리해줘야 할 필요는 없음

// 태그명에 의존하고 싶지 않다면? -> span 태그 컴포넌트 처리하고 box 컴포넌트 안에 들어가는 emoji 컴포넌트만 속성 다르게 하도록 box 컴포넌트 안에 ${Emoji}:hover {font-size:70px} 식으로 처리할 수 있음.

// themes : 기본적으로 모든 색상들을 가지고 있는 object
// themes object를 index.js에 만들어놓으면, App.js에서 background-color : ${(props) => props.theme.backgroundColor}로 사용할 수 있다.
// 테마를 바꿀 때마다 컴포넌트를 바꿔줄 필요없이 App.js에서 <App />을 감싸고있는 <ThemeProvider theme={lightTheme}>에서 theme={}만 바꿔주면 된다.
