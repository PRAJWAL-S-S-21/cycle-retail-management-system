import { Component } from '@angular/core';
import { CycleService } from '../../services/cycle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { AddCycleTypeComponent } from '../add-cycle-type/add-cycle-type.component';
import { BrandService } from '../../services/brand.service';
import { CycleTypeService } from '../../services/cycle-type.service';

@Component({
  selector: 'app-add-cycle',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-cycle.component.html',
  styleUrl: './add-cycle.component.css'
})
export class AddCycleComponent {

  newCycle: any = {
    sku: '',
    modelName: '',
    brandID: '',
    typeID: '',
    description: '',
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
    reorderThreshold: 0,
    imageURL: ''
  };

  brands: any[] = [];
  cycleTypes: any[] = [];

  constructor(private cycleService: CycleService, 
              private brandService : BrandService, 
              private cycleTypeService : CycleTypeService) {}

  ngOnInit() {
    this.loadBrands();
    this.loadCycleTypes();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (data) => this.brands = data,
      error: (err) => console.error('Error:', err)
    });
  }

  loadCycleTypes() {
    this.cycleTypeService.getCycleTypes().subscribe({
      next: (data) => this.cycleTypes = data,
      error: (err) => console.error('Error:', err)
    });
  }

  addCycle() {
    this.cycleService.addCycle(this.newCycle).subscribe({
      next: () => {
        alert('Cycle added successfully!');
        this.newCycle = {}; // Reset form
      },
      error: (err) => {
        console.error('Error adding cycle:', err);
        alert('Failed to add cycle.');
      }
    });
  }

  cancel() {
    this.newCycle = {
      sku: '',
      model_name: '',
      brand_id: '',
      type_id: '',
      description: '',
      price: 0,
      cost_price: null,
      stock_quantity: 0,
      reorder_threshold: null,
      image_url: ''
    }; 
  }

}
