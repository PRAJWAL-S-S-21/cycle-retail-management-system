import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = { AccountType: '', Email: '', Password: '' };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token);
        const role = this.authService.getRole();
        console.log('Extracted role:', role); // Debug log
        
        if (role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
          this.toastr.success('Success!', 'Admin Login')
        } else if (role === 'Employee') {
          this.router.navigate(['/employee-dashboard']);
          this.toastr.success('Success!', 'Employee Login')
        }
      },
      error: (err) => {
        this.toastr.error('Invalid credentials');
        console.error('Login failed', err);
      }
    });
  }
}
