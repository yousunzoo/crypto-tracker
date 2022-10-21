import styled from "styled-components";

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
