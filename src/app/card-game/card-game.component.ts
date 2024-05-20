import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent implements OnInit {
  suits: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  ranks: string[] = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];
  deck: string[] = [];
  player1Card: string = '';
  player2Card: string = '';
  result: string = '';
  player1Score: number = 0;
  player2Score: number = 0;
  round: number = 0;
  maxRounds: number = 5;
  currentPlayer: number = 1;

  ngOnInit() {
    this.initializeDeck();
  }

  initializeDeck() {
    this.deck = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.deck.push(`${rank} of ${suit}`);
      }
    }
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  drawCard() {
    if (this.deck.length < 2) {
      this.result = 'No more cards in the deck. Resetting game.';
      return;
    }

    if (this.currentPlayer === 1) {
      this.player1Card = this.deck.pop() || '';
      this.currentPlayer = 2;
    } else {
      this.player2Card = this.deck.pop() || '';
      this.currentPlayer = 1;
      this.determineWinner();
      this.round++;
    }
  }

  determineWinner() {
    const cardValue = (card: string) => {
      const rank = card.split(' ')[0];
      if (rank === 'J') return 11;
      if (rank === 'Q') return 12;
      if (rank === 'K') return 13;
      if (rank === 'A') return 14;
      return parseInt(rank);
    };

    const player1Value = cardValue(this.player1Card);
    const player2Value = cardValue(this.player2Card);

    if (player1Value > player2Value) {
      this.result = 'Player 1 wins this round!';
      this.player1Score++;
    } else if (player1Value < player2Value) {
      this.result = 'Player 2 wins this round!';
      this.player2Score++;
    } else {
      this.result = "It's a tie!";
    }
  }

  resetGame() {
    this.player1Card = '';
    this.player2Card = '';
    this.result = '';
    this.player1Score = 0;
    this.player2Score = 0;
    this.round = 0;
    this.currentPlayer = 1;
    this.initializeDeck();
  }
}
