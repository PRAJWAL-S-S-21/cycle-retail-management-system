import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {

  employees: any[] = [];
  isModalOpen = false;
  isEditing = false;
  selectedEmployee: any = {};

  // isEditModalOpen = false;
  // isAddModalOpen = false;

  employee = {
    username: '',
    email: '',
    passwordHash: '',
    role: 'Employee',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.adminService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        alert('Failed to fetch employee details.');
      }
    });
  }

  // Open the Edit Modal
  editEmployee(employee: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.selectedEmployee = { ...employee, password: '' }; // Keep password empty by default
  }

  // Close the Modal
  closeModal() {
    this.isModalOpen = false;
  }

  addEmployee() {
    const newEmployee = {
      username: this.selectedEmployee.username,
      email: this.selectedEmployee.email,
      passwordHash: this.selectedEmployee.password, // sending passwordHash for API
      role: this.selectedEmployee.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.adminService.registerEmployee(newEmployee).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.closeModal();
        this.fetchEmployees();
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        alert('Failed to add employee.');
      }
    });
  }

  openAddModal() {
    this.isEditing = false;
    this.selectedEmployee = {
      username: '',
      email: '',
      password: '',
      role: 'Employee'
    };
    this.isModalOpen = true;
  }

  openEditModal(employee: any) {
    this.isEditing = true;
    this.selectedEmployee = { ...employee, password: '' };
    this.isModalOpen = true;
  }



  // Save Employee Changes (Edit API)
  saveChanges() {
    if (!this.selectedEmployee.userID) {
      alert("Error: User ID is missing!");
      return;
    }

    const updatedData: any = {
      username: this.selectedEmployee.username,
      email: this.selectedEmployee.email,
      role: this.selectedEmployee.role
    };

    // Only send password if it’s provided
    if (this.selectedEmployee.password.trim() !== '') {
      updatedData.password = this.selectedEmployee.password;
    }

    this.adminService.updateEmployee(this.selectedEmployee.userID, updatedData).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.closeModal();
        this.fetchEmployees(); // Refresh table after update
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        alert('Failed to update employee.');
      }
    });
  }

  // Delete Employee API Call
  deleteEmployee(userID: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.adminService.deleteEmployee(userID).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.fetchEmployees();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee.');
        }
      });
    }
  }

}
