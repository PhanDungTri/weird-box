import { css } from "@emotion/react";
import { useAtom } from "jotai";
import KeySprite from "../../../assets/sprites/key.png";
import PlayerAvatar from "../../../assets/sprites/white_gamepad.png";
import { roomAtom } from "../../../atoms";
import Sprite from "../../../components/Sprite";
import { keyStyle, memberStyle } from "./styles";

type MemberProps = {
  id: string;
  name: string;
};

const Member = ({ id, name }: MemberProps): JSX.Element => {
  const [room] = useAtom(roomAtom);

  return (
    <div css={memberStyle} key={id}>
      <Sprite
        css={css`
          position: relative;
          display: block;
        `}
        src={PlayerAvatar}
        size={[24, 13]}
      />
      <div
        css={css`
          font-size: 8px;
          text-align: center;
          word-break: break-all;
        `}
      >
        {name}
      </div>
      {id === room?.owner && <Sprite src={KeySprite} size={[14, 21]} css={keyStyle} />}
    </div>
  );
};

export default Member;
