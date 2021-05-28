import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { roomAtom } from "../../../../atoms";
import Icon from "../../../../components/Icon";
import { keyStyle, memberStyle } from "./styles";

type MemberProps = {
  id: string;
  name: string;
};

const Member = ({ id, name }: MemberProps): JSX.Element => {
  const [room] = useAtom(roomAtom);

  return (
    <div css={memberStyle} key={id}>
      <Icon
        css={css`
          position: relative;
          display: block;
        `}
        name="gamepad"
      />
      <div
        css={css`
          text-align: center;
          word-break: break-all;
        `}
      >
        {name}
      </div>
      {id === room?.owner && <Icon name="key" css={keyStyle} />}
    </div>
  );
};

export default Member;
