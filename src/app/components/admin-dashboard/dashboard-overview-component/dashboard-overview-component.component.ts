import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective  } from 'ng2-charts';


interface PaymentMethodData {
  paymentType: string;
  totalRevenue: number;
}

interface OrdersPerDayData {
  date: string;
  orderCount: number;
}


@Component({
  selector: 'app-dashboard-overview-component',
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard-overview-component.component.html',
  styleUrl: './dashboard-overview-component.component.css'
})
export class DashboardOverviewComponentComponent {

  totalCustomers = 0;
  totalEmployees = 0;
  totalOrders = 0;
  totalOrderItems = 0;
  chartsReady = false;

  // Chart 1: Revenue by Payment Method
  paymentMethodChartData: ChartData<'pie', number[], string[] | string[][]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#007bff', '#28a745', '#ffc107']
    }]
  };
  paymentMethodChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff' // Add label color for dark theme
        }
      }
    }
  };

  // Chart 2: Orders per Day
  ordersPerDayChartData: ChartData<'line', number[], string[] | string[][]> = {
    labels: [],
    datasets: [{
      label: 'Orders Per Day',
      data: [],
      borderColor: '#17a2b8',
      backgroundColor: 'rgba(23,162,184,0.1)',
      fill: true,
      tension: 0.3
    }]
  };
  ordersPerDayChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        labels: {
          color: '#fff' // Add label color for dark theme
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  constructor(private dashboardService : DashboardService) {}

  ngOnInit(): void {
    this.loadCounts();
    this.loadPaymentMethodData();
    this.loadOrdersPerDayData();
  }

  loadCounts(): void {
    this.dashboardService.getCustomerCount().subscribe(count => this.totalCustomers = count);
    this.dashboardService.getEmployeeCount().subscribe(count => this.totalEmployees = count);
    this.dashboardService.getOrderCount().subscribe(count => this.totalOrders = count);
    this.dashboardService.getOrderItemCount().subscribe(count => this.totalOrderItems = count);
  }

  loadPaymentMethodData() {
    this.dashboardService.getRevenueByPaymentType().subscribe(data => {
      console.log('Payment Chart Data:', data);
      this.paymentMethodChartData = {
        labels: data.map(d => [d.paymentType]),
        datasets: [{
          data: data.map(d => d.totalRevenue ?? 0), // Use correct property name
          backgroundColor: ['#007bff', '#28a745', '#ffc107']
        }]
      };
      console.log('Payment Method Chart Data:', this.paymentMethodChartData);
      this.checkChartsReady();
    });
  }
  
  loadOrdersPerDayData() {
    this.dashboardService.getOrdersPerDay().subscribe(data => {
      console.log('Payment Chart Data:', data);
      this.ordersPerDayChartData = {
        labels: data.map(d => [new Date(d.date).toLocaleDateString()]), // Wrap in array
        datasets: [{
          label: 'Orders Per Day',
          data: data.map(d => d.orderCount ?? 0), // Use correct property name
          borderColor: '#17a2b8',
          backgroundColor: 'rgba(23,162,184,0.1)',
          fill: true,
          tension: 0.3
        }]
      };
      console.log('Orders Per Day Chart Data:', this.ordersPerDayChartData);
      this.checkChartsReady();
    });
  }
  
  checkChartsReady() {
    this.chartsReady = 
      (this.paymentMethodChartData.labels?.length ?? 0) > 0 && 
      (this.ordersPerDayChartData.labels?.length ?? 0) > 0;
  }

}
