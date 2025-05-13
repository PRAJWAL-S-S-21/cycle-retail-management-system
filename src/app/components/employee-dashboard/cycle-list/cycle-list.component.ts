import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CycleService } from '../../../services/cycle.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { BuyNowService } from '../../../services/buy-now.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cycle-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './cycle-list.component.html',
  styleUrl: './cycle-list.component.css'
})
export class CycleListComponent {


  cycles: any[] = [];
  selectedCycle: any = null;
  filteredCycles: any[] = [];

  // Filter properties
  searchTerm: string = '';
  selectedBrand: string = 'all';
  selectedType: string = 'all';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  
  // Dropdown options
  brands: any[] = [];
  types: any[] = [];

  constructor(private cycleService: CycleService, private router : Router,
              public cartService : CartService, private buyNowService: BuyNowService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loadCycles();
  }

  ngAfterViewInit() {
    this.checkDescriptionOverflow();
  }
  
  // Call this when the modal opens or when data changes
  checkDescriptionOverflow() {
    setTimeout(() => {
      const descElement = document.querySelector('.details-container p:nth-of-type(3)');
      if (descElement) {
        if (descElement.scrollHeight > descElement.clientHeight) {
          descElement.classList.add('overflow');
        } else {
          descElement.classList.remove('overflow');
        }
      }
    }, 100);
  }

  loadCycles(): void {
    this.cycleService.getCycles().subscribe({
      next: (data) => {
        console.log('Cycles:', data);
        this.cycles = data;

        this.filteredCycles = [...this.cycles];

        // Extract unique brands and types with type assertions
      this.brands = [...new Set(data.map((cycle: any) => cycle.brandName as string))];
      this.types = [...new Set(data.map((cycle: any) => cycle.typeName as string))];
      },
      error: (err) => {
        console.error('Error loading cycles:', err);
      }
    });
  }

  
  viewDetails(cycle: any): void {
    this.selectedCycle = cycle;
  }

  closeDetails(): void {
    this.selectedCycle = null;
  }

  addToCart(cycle: any) {
    this.cartService.addToCart(cycle);
    this.toaster.success('Cycle added to cart!');
    
  }

  buyNow(cycle: any) {
    this.buyNowService.setCycle(cycle);
    this.router.navigate(['/employee-dashboard/customer-registration'], {
      queryParams: { buyNow: true }
    });
  }

  applyFilters(): void {
    this.filteredCycles = this.cycles.filter(cycle => {
      // Model name search
      const matchesSearch = !this.searchTerm || 
        cycle.modelName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Brand filter
      const matchesBrand = this.selectedBrand === 'all' || 
        cycle.brandName === this.selectedBrand;
      
      // Type filter
      const matchesType = this.selectedType === 'all' || 
        cycle.typeName === this.selectedType;
      
      // Price range filter
     const matchesPrice = (!this.minPrice || cycle.price >= this.minPrice) && 
                          (!this.maxPrice || cycle.price <= this.maxPrice);
      
      return matchesSearch && matchesBrand && matchesType && matchesPrice;
    }); 
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedBrand = 'all';
    this.selectedType = 'all';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredCycles = [...this.cycles];
  }
 

}
