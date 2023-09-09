import { keyframes, styled } from "styled-components";

// Containers
export const EContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-height: 100vh;
  min-width: 80vw;
`;

export const PContainer = styled.div``;

// flex
export const FlexBox = styled.div`
  display: flex;
  flex-flow: ${(props) => (props.row ? "row wrap" : "column wrap")};
`;

// Words
export const Word = styled.p`
  font-size: ${(props) =>
    props.size1
      ? "0.7rem"
      : props.size2
      ? "1rem"
      : props.size3 
      ? "1.3rem"
      : props.size4
      ? "1.5rem"
      : "2rem"};

  color: ${(props) => (props.sub ? "gray" : "black")};

  font-weight: ${(props) => (props.bold ? "500" : "0")};
`;
// Effects

// Animations

export const strokeAnimation = keyframes`
  0% {
    fill: rgba(72,138,204,0);
    stroke: rgba(54,95,160,1);
    stroke-dashoffset: 25%; 
    stroke-dasharray: 0 50%; 
    stroke-width: 2;
  }
  70% {
    fill: rgba(72,138,204,0); 
    stroke: rgba(54,95,160,1); 
  }
  80% {
    fill: rgba(72,138,204,0); 
    stroke: rgba(54,95,160,1); 
    stroke-width: 3; 
  }
  100% {
    fill: rgba(72,138,204,1); 
    stroke: rgba(54,95,160,0);
    stroke-dashoffset: -25%; 
    stroke-dasharray: 50% 0; 
    stroke-width: 0;
  }
`;

export const StyledLoginText = styled.text`
  font-family: "Russo One", sans-serif;
  font-size: 4rem;
  animation: ${strokeAnimation} 7s infinite alternate;
  stroke-width: 2;
  stroke: #365fa0;
  fill: transparent;
`;
