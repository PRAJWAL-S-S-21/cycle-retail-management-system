import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-sales-revenue',
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './sales-revenue.component.html',
  styleUrl: './sales-revenue.component.css'
})
export class SalesRevenueComponent implements OnInit {
  totalRevenue: number = 0;
  revenueToday: number = 0;
  revenueThisMonth: number = 0;
  totalOrders: number = 0;

  chartsReady = false;


  monthlyRevenueChartData: ChartDataset[] = [];
  monthlyRevenueChartLabels: string[] = [];
  monthlyRevenueChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  monthlyRevenueChartType: ChartType = 'line';


  orderStatusChartData: ChartData<'pie', number[], string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FFC107', '#4CAF50', '#F44336']  // <-- Add colors here
    }]
  };

  orderStatusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  topSellingCyclesChartData: ChartData<'bar', number[], string[]> = {
    labels: [],
    datasets: [{
      label: 'Top Selling Cycles',
      data: [],
      backgroundColor: '#4CAF50'
    }]
  };
  topSellingCyclesChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y', // 👉 Horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Fetch data from your services
    this.orderService.getTotalRevenue().subscribe(data => {
      this.totalRevenue = data;
    });

    this.orderService.getRevenueToday().subscribe(data => {
      this.revenueToday = data;
    });

    this.orderService.getRevenueThisMonth().subscribe(data => {
      this.revenueThisMonth = data;
    });

    this.orderService.getTotalOrders().subscribe(data => {
      this.totalOrders = data;
    });

    // Fetch revenue-by-day (for Line Chart)
    this.orderService.getMonthlyRevenueBreakdown().subscribe(data => {
      this.prepareMonthlyRevenueChart(data);
    });

    // ➡️ Load Order Status Counts
    this.orderService.getOrderStatusCounts().subscribe(data => {
      console.log('Order Status Counts:', data);
      this.orderStatusChartData.labels = data.map((x: any) => x.status);
      this.orderStatusChartData.datasets[0].data = data.map((x: any) => x.count);

      this.checkChartsReady();
    });

    // ➡️ Load Top Selling Cycles
    this.orderService.getTopSellingCycles().subscribe(data => {
      console.log('Top Selling Cycles:', data);
      this.topSellingCyclesChartData.labels = data.map((x: any) => x.cycleName);
      this.topSellingCyclesChartData.datasets[0].data = data.map((x: any) => x.totalQuantitySold);
      
      this.checkChartsReady();
    });

  }

  prepareMonthlyRevenueChart(data: any[]): void {
    // Format labels
    this.monthlyRevenueChartLabels = data.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()}/${date.getMonth() + 1}`; // dd/mm format
    });
    
    // Enhanced chart data with styling properties
    this.monthlyRevenueChartData = [
      {
        data: data.map(item => item.revenue),
        label: 'Revenue ($)',
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3498db',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true
      }
    ];
    
    // Set chart options for better visibility on dark background
    this.monthlyRevenueChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(30, 40, 56, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(74, 157, 179, 0.5)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return '$' + (context.raw as number).toLocaleString();
            }
          }
        }
      }
    };
  }

  checkChartsReady() {
    if ((this.orderStatusChartData.labels?.length ?? 0) && (this.topSellingCyclesChartData.labels?.length ?? 0)) {
      this.chartsReady = true;
    }
  }
  
}
