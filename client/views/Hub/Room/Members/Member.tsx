import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { roomAtom } from "../../../../atoms";
import Icon from "../../../../components/Icon";
import { keyStyle, MemberName, StyledMember } from "./styles";

type MemberProps = {
  id: string;
  name: string;
};

const Member = ({ id, name }: MemberProps): JSX.Element => {
  const [room] = useAtom(roomAtom);

  return (
    <StyledMember key={id}>
      <Icon
        css={css`
          position: relative;
          display: block;
        `}
        name="gamepad"
      />
      <MemberName>{name}</MemberName>
      {id === room?.owner && <Icon name="key" css={keyStyle} />}
    </StyledMember>
  );
};

export default Member;
