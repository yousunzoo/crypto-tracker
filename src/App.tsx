import React from "react";
import styled from "styled-components";
function App() {
  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;
  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  return (
    <Container>
      <H1>Hello</H1>
    </Container>
  );
}

export default App;

// any 타입을 배제하려고 노력해야 한다.
// event : React.FormEvent<HTMLInputElement> => 어떤 타입 지정해야할지는 구글링!
// event에 타입을 지정해줘야 이벤트 함수 안의 오류를 체크할 수 있다.
// TS 에서는 event.target.value 보단 event.currentTarget.value를 사용한다.
