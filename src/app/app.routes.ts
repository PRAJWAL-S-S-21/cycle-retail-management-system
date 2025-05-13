import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';   
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ViewCyclesComponent } from './components/admin-dashboard/view-cycles/view-cycles.component';
import { AddCycleComponent } from './components/add-cycle/add-cycle.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddCycleTypeComponent } from './components/add-cycle-type/add-cycle-type.component';
import { CycleListComponent } from './components/employee-dashboard/cycle-list/cycle-list.component';
import { CartComponent } from './components/employee-dashboard/cart/cart.component';
import { CustomerRegistrationComponent } from './components/employee-dashboard/customer-registration/customer-registration.component';
import { BillingDetailsComponent } from './components/employee-dashboard/billing-details/billing-details.component';
import { HomeComponent } from './components/employee-dashboard/home/home.component';
import { PaymentComponent } from './components/employee-dashboard/payment/payment.component';
import { OrderHistoryComponent } from './components/employee-dashboard/order-history/order-history.component';
import { PaymentSuccessComponent } from './components/employee-dashboard/payment-success/payment-success.component';
import { OrderDetailsComponent } from './components/employee-dashboard/order-details/order-details.component';
import { CustomersComponent } from './components/employee-dashboard/customers/customers.component';
import { ProfileComponent } from './components/employee-dashboard/profile/profile.component';
import { ViewEmployeeComponent } from './components/admin-dashboard/view-employee/view-employee.component';
import { ViewBrandsComponent } from './components/admin-dashboard/view-brands/view-brands.component';
import { ViewCycleTypesComponent } from './components/admin-dashboard/view-cycle-types/view-cycle-types.component';
import { SalesRevenueComponent } from './components/admin-dashboard/sales-revenue/sales-revenue.component';
import { DashboardOverviewComponentComponent } from './components/admin-dashboard/dashboard-overview-component/dashboard-overview-component.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard],
      children: [
        { path: '', redirectTo: 'sales-revenue', pathMatch: 'full' },
        { path: 'view-employee', component: ViewEmployeeComponent },
        { path: 'view-brands', component: ViewBrandsComponent },
        { path: 'view-cycle-types', component: ViewCycleTypesComponent },
        { path: 'view-cycles', component: ViewCyclesComponent },
        { path: 'order-history', component: OrderHistoryComponent },
        { path: 'customers', component: CustomersComponent },
        { path: 'sales-revenue', component: SalesRevenueComponent },
        {path: 'overview', component: DashboardOverviewComponentComponent }
      ]
     },
    { path: 'admin/add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard, RoleGuard] },
    { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard],
             children: [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: HomeComponent },
                { path: 'cycle-list', component : CycleListComponent },
                { path: 'cart', component : CartComponent},
                { path: 'customer-registration', component: CustomerRegistrationComponent},
                { path: 'billing-details/:customerId', component: BillingDetailsComponent},
                { path: 'payment', component: PaymentComponent },
                { path: 'orders', component: OrderHistoryComponent},
                { path: 'payment-success', component: PaymentSuccessComponent },
                { path: 'order-details', component: OrderDetailsComponent},
                { path: 'customers', component: CustomersComponent },
                { path: 'profile', component: ProfileComponent }
             ]
     },
    { path: '**', redirectTo: 'login' }
];
