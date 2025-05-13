import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
// import { AddBrandComponent } from '../add-brand/add-brand.component';
// import { AddCycleComponent } from '../add-cycle/add-cycle.component';
// import { AddCycleTypeComponent } from '../add-cycle-type/add-cycle-type.component';
import { ViewCyclesComponent } from './view-cycles/view-cycles.component';
import { ViewBrandsComponent } from './view-brands/view-brands.component';
import { ViewCycleTypesComponent } from './view-cycle-types/view-cycle-types.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  // isSidebarVisible = false;
  isEmployeeDropdownVisible = false;
  isCycleDropdownVisible = false;
  selectedComponent: string | null = null;
  dropdownOpen = false;

  constructor(public authService: AuthService) {}

  // toggleSidebar() {
  //   this.isSidebarVisible = !this.isSidebarVisible;
  // }

  logout() {
    this.authService.logout();
  }

  showComponent(component: string) {
    this.selectedComponent = component;
  }

  hideComponent() {
    this.selectedComponent = null; // Hide the component
  }

  toggleEmployeeDropdown() {
    this.isEmployeeDropdownVisible = !this.isEmployeeDropdownVisible; // Toggle dropdown visibility
  }

  //✅ Toggle Cycle Dropdown
  toggleCycleDropdown() {
    this.isCycleDropdownVisible = !this.isCycleDropdownVisible;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

}
