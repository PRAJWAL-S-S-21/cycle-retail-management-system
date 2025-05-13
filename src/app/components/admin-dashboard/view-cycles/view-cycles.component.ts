import { Component, Pipe } from '@angular/core';
import { CycleService } from '../../../services/cycle.service';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../services/brand.service';
import { CycleTypeService } from '../../../services/cycle-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-cycles',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-cycles.component.html',
  styleUrl: './view-cycles.component.css'
})
export class ViewCyclesComponent {

  cycles: any[] = [];
  brands: any[] = [];
  cycleTypes: any[] = [];
  isModalOpen = false
  isEditModalOpen = false;
  selectedCycle : any = {};

  newCycle: any = {
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

  constructor(
    private cycleService: CycleService,
    private brandService: BrandService,
    private cycleTypeService: CycleTypeService
  ) {}

  ngOnInit(): void {
    this.fetchCycles();
    this.loadBrands();
    this.loadCycleTypes();
  }

  fetchCycles() {
    this.cycleService.getCycles().subscribe({
      next: (data) => {
        console.log('Cycles:', data);
        this.cycles = data;
      },
      error: (err) => {
        console.error('Error fetching cycles:', err);
        alert('Failed to load cycle details.');
      }
    });
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
    }; // Reset form
  }

  addCycle() {

    const formattedCycle = {
      SKU: this.newCycle.sku,  
      ModelName: this.newCycle.model_name,  
      BrandID: this.newCycle.brand_id,   
      TypeID: this.newCycle.type_id, 
      Description: this.newCycle.description,  
      Price: this.newCycle.price,  
      CostPrice: this.newCycle.cost_price,  
      StockQuantity: this.newCycle.stock_quantity,   
      ReorderThreshold: this.newCycle.reorder_threshold,  
      ImageURL: this.newCycle.image_url,   
      IsActive: true,  
    };

    this.cycleService.addCycle(formattedCycle).subscribe({
      next: (response) => {
        console.log('Cycle added:', response);
        alert('Cycle added successfully!');
        this.closeModal();
        this.fetchCycles(); // Refresh the cycles list
      },
      error: (err) => {
        
        console.error('Error adding cycle:', err);
        alert('Failed to add cycle.');
      }
    });
  }

  openEditModel(cycle : any){
    this.selectedCycle = {...cycle};
    this.isEditModalOpen = true;
    console.log('Selected Cycle:', this.selectedCycle);
  }

  closeEditModal(){
    this.isEditModalOpen = false;
    this.selectedCycle = {};
  }

  updateCycle(){
    const formattedCycle = {
      SKU: this.selectedCycle.sku,
      ModelName: this.selectedCycle.modelName,
      BrandID: this.selectedCycle.brandID,
      TypeID: this.selectedCycle.typeID,
      Description: this.selectedCycle.description,
      Price: this.selectedCycle.price,
      CostPrice: this.selectedCycle.cost_price,
      StockQuantity: this.selectedCycle.stockQuantity,
      ReorderThreshold: this.selectedCycle.reorder_threshold,
      ImageURL: this.selectedCycle.imageURL,
      IsActive: true,
    }
    console.log('Formatted Cycle:', formattedCycle);

    this.cycleService.updateCycle(this.selectedCycle.cycleID, formattedCycle).subscribe({
      next: (response) => {
        console.log('Cycle updated:', response);
        alert('Cycle updated successfully!');
        this.closeEditModal();
        this.fetchCycles(); // Refresh the cycles list
      },
      error: (err) => {
        console.error('Error updating cycle:', err);
        alert('Failed to update cycle.');
      }
    })
  }

  deleteCycle(cycle_id :string){
    this.cycleService.deleteCycle(cycle_id).subscribe({
      next:(response)=>{
        console.log('Cycle deleted:', response);
        alert('Cycle deleted successfully!');
        this.fetchCycles(); // Refresh the cycles list
      },
      error : (err) =>{
        console.error('Error deleting cycle:', err);
        alert('Failed to delete cycle.');
      }
    })
  }
}
