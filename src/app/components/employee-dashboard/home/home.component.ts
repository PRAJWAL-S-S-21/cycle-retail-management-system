import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Slide {
  image: string;
  alt: string;
  title: string;
  description: string;
}

interface Bike {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  image: string;
  stock: number;
}

interface Promo {
  heading: string;
  subheading: string;
  text: string;
}

interface News {
  date: string;
  title: string;
  summary: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  slides: Slide[] = [
    {
      image: 'assets/home/slide1.jpg', 
      alt: 'Premium Road Bicycle',
      title: 'Experience the Road',
      description: 'Premium road Bicyle for the serious cyclist'
    },
    {
      image: 'assets/home/slide2.jpg',
      alt: 'Mountain Bicycle Adventure',
      title: 'Conquer Any Trail',
      description: 'Durable mountain Bicyle for off-road adventures'
    },
    {
      image: 'assets/home/slide3.jpg',
      alt: 'Gravel Bike',
      title: 'Go Anywhere',
      description: 'Versatile gravel Bicycle for mixed terrain'
    },
    {
      image: 'assets/home/slide4.jpg',
      alt: 'City Commuter',
      title: 'Welcome to EG Cycle Store',
      description: 'Stylish city Bicycle for your daily commute'
    }
  ];

  // Featured bikes
  featuredBikes: Bike[] = [
    {
      id: 1,
      name: 'Roadmaster Pro',
      brand: 'Giant',
      type: 'Road Bike',
      price: 2000,
      image: 'assets/images/bike1.jpg',
      stock: 20
    },
    {
      id: 2,
      name: 'Alpine Racer',
      brand: 'Cannondale',
      type: 'Gravel Bike',
      price: 2200,
      image: 'assets/images/bike2.jpg',
      stock: 25
    },
    {
      id: 3,
      name: 'Speedster 3000',
      brand: 'Trek',
      type: 'Mountain Bike',
      price: 1500,
      image: 'assets/images/bike3.jpg',
      stock: 15
    }
  ];

  // Promotional content
  promos: Promo[] = [
    {
      heading: 'SPECIAL OFFER',
      subheading: '20% OFF ALL ACCESSORIES',
      text: 'When purchased with any bike this month!'
    },
    {
      heading: 'NEW ARRIVALS',
      subheading: '2025 MODELS IN STOCK',
      text: 'Be the first to ride the latest innovations!'
    },
    {
      heading: 'EMPLOYEE DISCOUNT',
      subheading: 'ADDITIONAL 10% OFF',
      text: 'Use your employee code at checkout'
    }
  ];

  // Latest news
  latestNews: News[] = [
    {
      date: 'April 8, 2025',
      title: 'New Product Training',
      summary: 'Join our training session on the latest bike models and features.'
    },
    {
      date: 'April 5, 2025',
      title: 'Employee Cycling Event',
      summary: 'Sign up for our monthly group ride happening next weekend.'
    },
    {
      date: 'April 1, 2025',
      title: 'Inventory Update',
      summary: 'New shipment of mountain bikes has arrived. Check updated stock.'
    }
  ];

  currentSlide = 0;
  currentPromoIndex = 0;
  currentPromo = this.promos[0];
  private carouselInterval: any;
  private promoInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCarousel();
    this.startPromoRotation();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    this.stopPromoRotation();
  }

  // Carousel methods
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Promo rotation
  startPromoRotation(): void {
    this.promoInterval = setInterval(() => {
      this.currentPromoIndex = (this.currentPromoIndex + 1) % this.promos.length;
      this.currentPromo = this.promos[this.currentPromoIndex];
    }, 8000);
  }

  stopPromoRotation(): void {
    if (this.promoInterval) {
      clearInterval(this.promoInterval);
    }
  }

  // Navigation and interaction methods
  navigateToCycles(): void {
    this.router.navigate(['/employee-dashboard/cycle-list']);
  }

  viewDetails(bike: Bike): void {
    // Implement view details logic or navigation
    console.log('View details for:', bike);
    // Example: this.router.navigate(['/employee-dashboard/cycle-details', bike.id]);
  }

  addToCart(bike: Bike): void {
    // Implement add to cart logic
    console.log('Adding to cart:', bike);
    // Example: this.cartService.addToCart(bike);
  }

  

}
