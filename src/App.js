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
  transform : rotate(180deg);
  border-radius : 100px;
}
100% {
  transform :rotate(360deg);
  border-radius:0px;
}
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 70px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>😊</span>
      </Box>
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
