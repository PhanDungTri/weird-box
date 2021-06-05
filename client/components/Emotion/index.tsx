import { useState } from "react";
import EmotionSprites from "url:../../assets/sprites/emotions.png";
import { EMOTION, SERVER_EVENT_NAME } from "../../../shared/constants";
import { useListenServerEvent } from "../../hooks";
import { centerizeStyle } from "../../styles";
import Icon from "../Icon";
import Sprite from "../Sprite";

type EmotionProps = {
  id: string;
  className?: string;
};

const SIZE = [32, 32] as [number, number];
const SPRITE_POS = [...Object.values(EMOTION)];

const Emotion = ({ id, className }: EmotionProps): JSX.Element => {
  const [emotion, setEmotion] = useState<EMOTION | null>(null);

  useListenServerEvent(SERVER_EVENT_NAME.EmotionExpressed, (sender: string, emotion: EMOTION) => {
    if (sender === id) setEmotion(emotion);
  });

  return (
    <>
      {emotion && (
        <Icon name="bubble_text" scale={2} className={className}>
          <Sprite
            onAnimationEnd={() => setEmotion(null)}
            steps={6}
            src={EmotionSprites}
            size={SIZE}
            row={SPRITE_POS.indexOf(emotion)}
            loop={3}
            css={centerizeStyle}
          />
        </Icon>
      )}
    </>
  );
};

export default Emotion;
