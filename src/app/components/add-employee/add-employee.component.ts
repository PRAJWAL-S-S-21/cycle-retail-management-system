import { Component, EventEmitter, Output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  @Output() hideAddEmployeeForm = new EventEmitter<void>();
  employee = {
    username: '',
    email: '',
    passwordHash: '',
    role: 'Employee',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  constructor(private adminService: AdminService) {}

  registerEmployee() {
    this.adminService.registerEmployee(this.employee).subscribe({
      next: (response) => {
        alert('Employee registered successfully!');
        this.resetForm(); // Clear the form
        this.hideAddEmployeeForm.emit(); // Hide the form on success
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to register employee.');
      }
    });
  }

  // Cancel method to reset the form
  close() {
    this.resetForm(); // Reset the form fields
    this.hideAddEmployeeForm.emit(); // Hide the form
    // Optional: Add navigation logic, e.g., this.router.navigate(['/employees']);
  }

  private resetForm() {
    this.employee = {
      username: '',
      email: '',
      passwordHash: '',
      role: 'Employee',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }


}
