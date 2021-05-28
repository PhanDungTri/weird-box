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
            accept_game: [0, 1457.8231292517007],
            button_click: [3000, 415.01133786848055],
            choose_card: [5000, 199.63718820861675],
            deal_pop: [7000, 417.95918367346906],
            defeat: [9000, 1500],
            door_close: [12000, 762.1541950113375],
            door_knock: [14000, 498.730158730158],
            eliminate: [16000, 612.4036281179137],
            found_game: [18000, 1058.8208616780043],
            heal: [21000, 1000],
            mirror: [23000, 1054.0589569161014],
            mirror_crack: [26000, 500],
            mirror_reflect: [28000, 835.1020408163272],
            Danger: [30000, 141.29251700680356],
            Info: [32000, 394.55782312925436],
            Safe: [34000, 746.8934240362798],
            Warning: [36000, 435.0340136054456],
            overcharged: [38000, 750],
            play_card: [40000, 501.0430839002282],
            poison: [42000, 581.8594104308374],
            punch: [44000, 373.4467120181435],
            reject_game: [46000, 2000],
            shield: [49000, 1117.052154195008],
            shield_block: [52000, 900.0907029478426],
            shield_break: [54000, 709.7505668934261],
            take_card: [56000, 504.05895691609715],
            victory: [58000, 2275.510204081634],
            whoosh: [62000, 250.09070294784408],
          },
          onload: () => setLoadedAssetCounter(loadedAssetCounter + 1),
        })
      );
    else if (loadedAssetCounter === total.current) setTimeout(() => setRoute(ROUTE.Hub), 1000);
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
