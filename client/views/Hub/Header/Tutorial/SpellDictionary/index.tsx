import { useAtom } from "jotai";
import { SPELL_NAME } from "../../../../../../shared/constants";
import { languageAtom } from "../../../../../atoms";
import Grid from "../../../../../components/Grid";
import H1 from "../../../../../components/H1";
import Icon from "../../../../../components/Icon";
import { SpellDescription } from "./styles";

const SpellDictionary = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.spellDictionary}</H1>
      <Grid css={{ padding: "8px" }}>
        <SpellDescription>
          <div>
            <Icon css={{ position: "relative" }} name="charge" />
            <Icon css={{ position: "relative" }} name="consume" />
          </div>
          <div>{language.noEffectDescription}</div>
        </SpellDescription>
        <SpellDescription>
          <Icon css={{ position: "relative" }} name={SPELL_NAME.Punch} />
          <div>{language.punchDescription}</div>
        </SpellDescription>
        <SpellDescription>
          <Icon css={{ position: "relative" }} name={SPELL_NAME.Poison} />
          <div>{language.poisonDescription}</div>
        </SpellDescription>
        <SpellDescription>
          <Icon css={{ position: "relative" }} name={SPELL_NAME.Heal} />
          <div>{language.healDescription}</div>
        </SpellDescription>
        <SpellDescription>
          <Icon css={{ position: "relative" }} name={SPELL_NAME.Shield} />
          <div>{language.shieldDescription}</div>
        </SpellDescription>
        <SpellDescription>
          <Icon css={{ position: "relative" }} name={SPELL_NAME.Mirror} />
          <div>{language.mirrorDescription}</div>
        </SpellDescription>
      </Grid>
    </div>
  );
};

export default SpellDictionary;
