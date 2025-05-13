import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {

  newBrand: any = { name: '', description: '' };

  constructor(private brandService: BrandService) {}

  addBrand() {
    this.brandService.addBrand(this.newBrand).subscribe({
      next: () => {
        alert('Brand added successfully!');
        this.newBrand = {}; 
      },
      error: (err) => {
        console.error('Error adding brand:', err);
        alert('Failed to add brand.');
      }
    });
  }

  cancel() {
    this.newBrand = { name: '', description: '' }; // Reset form
    // Optionally navigate back or close modal
  }
}
