import { css } from "@emotion/react";
import { Howl } from "howler";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import EffectSound from "../assets/sounds/effects.mp3";
import BoxOfCardSprites from "../assets/sprites/box_of_cards.png";
import ContentFrameSprite from "../assets/sprites/card_content_frame.png";
import IconSprites from "../assets/sprites/icons.png";
import LoadingSpriteSheet from "../assets/sprites/loading_animation.png";
import SpellAnimations from "../assets/sprites/spell_animations.png";
import { routeAtom, soundAtom } from "../atoms";
import Loading from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import { ROUTE } from "../constants";
import socket from "../services/socket";
import { centerizeStyle, pageStyle } from "../styles";

const Initiator = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);
  const [, setSound] = useAtom(soundAtom);
  const [loadedAssetCounter, setLoadedAssetCounter] = useState(0);
  const spriteSources = useRef<string[]>([
    IconSprites,
    SpellAnimations,
    ContentFrameSprite,
    LoadingSpriteSheet,
    BoxOfCardSprites,
  ]);
  const total = useRef(spriteSources.current.length + 1);

  useEffect(() => {
    if (loadedAssetCounter < spriteSources.current.length) {
      const img = new Image();
      img.src = spriteSources.current[loadedAssetCounter];
      img.onload = () => setLoadedAssetCounter(loadedAssetCounter + 1);
    } else if (loadedAssetCounter === spriteSources.current.length)
      setSound(
        new Howl({
          src: [EffectSound],
          sprite: {
            Accept: [0, 6000],
            Cancel: [7000, 6000],
            Defeat: [14000, 1500],
            DoorClose: [17000, 762.1541950113375],
            Eliminated: [19000, 835.9183673469381],
            Error: [21000, 360.0226757369604],
            GameFound: [23000, 1058.8435374149653],
            Heal: [26000, 1450.657596371883],
            Info: [29000, 599.7278911564621],
            KnockDoor: [31000, 498.730158730158],
            Mirror: [33000, 1054.036281179137],
            MirrorBreak: [36000, 500],
            MirrorReflect: [38000, 835.1020408163237],
            Overcharged: [40000, 750],
            PlayCard: [42000, 501.0430839002282],
            Poison: [44000, 827.7324263038537],
            Pop: [46000, 417.9591836734673],
            Punch: [48000, 286.96145124716566],
            Safe: [50000, 1109.3424036281192],
            Shield: [53000, 1117.052154195008],
            ShieldBlock: [56000, 900.0907029478426],
            ShieldBreak: [58000, 603.5600907029491],
            Swoosh: [60000, 1109.3424036281192],
            TakeCard: [63000, 504.0362811791397],
            Victory: [65000, 2275.510204081627],
            Warning: [69000, 366.0997732426239],
          },
          onload: () => setLoadedAssetCounter(loadedAssetCounter + 1),
        })
      );
    else if (loadedAssetCounter === total.current) {
      socket.connect();
      socket.on("connect", () => setTimeout(() => setRoute(ROUTE.Hub), 1000));
    }
  }, [loadedAssetCounter]);

  return (
    <div css={[pageStyle]}>
      <Loading css={centerizeStyle} scale={4} />
      <ProgressBar
        css={[
          css`
            ${centerizeStyle}
            width: 80%;
            position: fixed;
            bottom: 0;
            top: initial;
          `,
        ]}
        current={Math.floor((loadedAssetCounter * 100) / total.current)}
        suffix="%"
      />
    </div>
  );
};

export default Initiator;
