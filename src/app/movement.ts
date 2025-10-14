import { Injectable } from '@angular/core';

// Definimos la estructura de un movimiento
export interface Movement {
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class Movement {
  private movements: { [key: string]: Movement[] } = {};

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('movements');
    this.movements = data ? JSON.parse(data) : {};
  }

  private saveToLocalStorage() {
    localStorage.setItem('movements', JSON.stringify(this.movements));
  }

  getMovementsForDay(dateString: string): Movement[] {
    return this.movements[dateString] || [];
  }

  addMovement(dateString: string, movement: Movement) {
    if (!this.movements[dateString]) {
      this.movements[dateString] = [];
    }
    this.movements[dateString].push(movement);
    this.saveToLocalStorage();
  }
}
