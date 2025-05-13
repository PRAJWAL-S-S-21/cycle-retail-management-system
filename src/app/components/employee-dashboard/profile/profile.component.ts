import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  employee: any;
  editableEmployee: any = {};
  editMode: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService){}

  ngOnInit(): void {
    let userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          this.employee = user;
          console.log(this.employee);
        },
        error: (err) => {
          console.error('Failed to load employee profile', err);
        }
      });
    }
  }


  toggleEdit() {
    this.editMode = !this.editMode;
    this.editableEmployee = { ...this.employee, password: '' };
  }

  saveProfileChanges() {
    if (!this.employee?.userID) return;

    const updatedData: any = {
      username: this.editableEmployee.username,
      email: this.editableEmployee.email
    };

    if (this.editableEmployee.password.trim() !== '') {
      updatedData.password = this.editableEmployee.password;
    }

    console.log(updatedData);

    this.userService.updateUser(this.employee.userID, updatedData).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully!');
        this.editMode = false;
        this.ngOnInit(); // Refresh profile
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.toastr.error('Failed to update profile');
      }
    });
  }


  logout()
  {
    this.authService.logout();
  }

}
