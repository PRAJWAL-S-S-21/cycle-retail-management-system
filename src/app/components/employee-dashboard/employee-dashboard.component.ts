import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule,RouterOutlet, RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  selectedCycle : any = null;
  showCart = false;

  currentView: string = 'home'; // default view


  constructor(public authService: AuthService) {}

  getRole() {
    return this.authService.getRole();
  }

  // viewDetails(cycle: any) {
  //   this.selectedCycle = cycle;
  //   this.showCart = false;
  //   // this.currentView = 'cycle-details';
  // }

  // clsoseDetails() {
  //   this.selectedCycle = null;
  //   this.currentView = 'cycles';
  // }

  // viewCart(){
  //   this.showCart = true;
  //   this.selectedCycle = null;
  //   this.currentView = 'cart';
  // }

  // switchView(view: string) {
  //   this.currentView = view;
  //   this.selectedCycle = null;
  //   this.showCart = false;
  // }



}
