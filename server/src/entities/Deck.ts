import EFFECT_NAME from "../../../shared/src/effectName";
import Card from "./Card";

interface DeckOptions {
  isEmpty: boolean;
}

const generateCards = (): Card[] => {
  const cards: Card[] = [];

  // power point is from 0 - 9
  for (let i = 0; i < 10; i++) {
    Object.values(EFFECT_NAME).forEach((eff) => {
      cards.push(...new Array<Card>(4).fill(new Card(i, eff)));
      cards.push(...new Array<Card>(4).fill(new Card(-i, eff)));
    });
  }

  return cards;
};

class Deck {
  private cards: Card[];

  constructor(options?: DeckOptions) {
    options = options || { isEmpty: false };

    if (options.isEmpty) {
      this.cards = [];
    } else {
      this.cards = generateCards();
      this.shuffle();
    }
  }

  // Credit: https://stackoverflow.com/a/12646864/8884948
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public static copy(source: Deck): Deck {
    const deck = new Deck({ isEmpty: true });
    deck.cards = source.cards;
    return deck;
  }

  public pop(): Card | undefined {
    return this.cards.pop();
  }

  public push(card: Card): void {
    this.cards.push(card);
  }

  public getSize(): number {
    return this.cards.length;
  }

  public clear(): void {
    this.cards = [];
  }
}

export default Deck;
