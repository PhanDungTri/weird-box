import styled from "@emotion/styled";
import { COLOR } from "../constants";
import { centerizeStyle, pixelBorderStyle } from "../styles";

const Page = styled.div`
  ${centerizeStyle}
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 800px;
  overflow: hidden;

  @media screen and (min-width: 600px) {
    ${pixelBorderStyle(4, [COLOR.Normal])};
  }
`;

export default Page;
