import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
0% {
  transform :rotate(0deg);
  border-radius:0px;
}
50% {
  transform : rotate(360deg);
  border-radius : 100px;
}
100% {
  transform :rotate(0deg);
  border-radius:0px;
}
`;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box />
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
