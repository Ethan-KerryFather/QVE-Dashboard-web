import { styled } from "styled-components";
import { FlexBox } from "./customComponents";

const WrapBox = styled(FlexBox)`
  padding: 20px;
`;

function ChartWrapper({ children }) {
  return <WrapBox>{children}</WrapBox>;
}

export default ChartWrapper;
