import { SPELL_NAME } from "../../../shared/constants";
import Card from "../Card";

class Deck {
  private cards: Card[] = [];

  constructor(empty = false) {
    if (!empty) {
      for (let i = 0; i < 10; i++) {
        Object.values(SPELL_NAME).forEach((eff) => {
          this.cards.push(new Card(i, eff));
          this.cards.push(new Card(-i, eff));
        });
      }
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

  public copy(source: Deck): void {
    this.cards = [...source.cards];
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
