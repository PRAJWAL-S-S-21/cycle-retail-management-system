import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-brands',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-brands.component.html',
  styleUrl: './view-brands.component.css'
})
export class ViewBrandsComponent implements OnInit {

  // brands: any[] = [];

  // constructor(private brandService: BrandService) {}

  // ngOnInit(): void {
  //   this.fetchBrands();
  // }

  // // Fetch all brands from API
  // fetchBrands() {
  //   this.brandService.getBrands().subscribe({
  //     next: (data) => {
  //       this.brands = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching brands:', err);
  //       alert('Failed to load brand details.');
  //     }
  //   });
  // }

  brands: any[] = [];
  isModalOpen = false;
  isEditing = false;
  newBrand: any = { name: '', description: '' };
  selectedBrandId : string | null = null;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands() {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        console.log('Brands:', data);
        this.brands = data;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
        alert('Failed to load brand details.');
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.newBrand = { name: '', description: '' };
  }

  openEditModal(brand: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.selectedBrandId = brand.brandID;
    this.newBrand = { name: brand.name, description: brand.description };
  }

  closeModal() {
    this.isModalOpen = false;
    this.newBrand = { name: '', description: '' }; // Reset form
    this.isEditing = false;
    this.selectedBrandId = null;
  }

  addBrand() {
    this.brandService.addBrand(this.newBrand).subscribe({
      next: () => {
        alert('Brand added successfully!');
        this.closeModal();
        this.fetchBrands(); // Refresh the brands list
      },
      error: (err) => {
        console.error('Error adding brand:', err);
        alert('Failed to add brand.');
      }
    });
  }

  // Update an Existing Brand
updateBrand() {
  if (!this.selectedBrandId) return;

  this.brandService.updateBrand(this.selectedBrandId, this.newBrand).subscribe({
    next: () => {
      alert('Brand updated successfully!');
      this.closeModal();
      this.fetchBrands();
    },
    error: (err) => {
      console.error('Error updating brand:', err);
      alert('Failed to update brand.');
    }
  });
}

// Delete a Brand
deleteBrand(brandId: string) {
  if (!confirm('Are you sure you want to delete this brand?')) return;

  this.brandService.deleteBrand(brandId).subscribe({
    next: () => {
      alert('Brand deleted successfully!');
      this.fetchBrands();
    },
    error: (err) => {
      console.error('Error deleting brand:', err);
      alert('Failed to delete brand.');
    }
  });
}
}
