import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyNowService {

  constructor() { }

  private selectedCycle: any = null;

  setCycle(cycle: any) {
    this.selectedCycle = cycle;
    localStorage.setItem('buyNowCycle', JSON.stringify(cycle));
    console.log('Cycle set in BuyNowService:', cycle); // Debug output
  }

  getCycle(): any {
    return this.selectedCycle;
  }

  clear() {
    this.selectedCycle = null;
  }
}
