
import { ProductCardComponent } from './../../shared/product-card/product-card.component';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-filter-product-by-price',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './filter-product-by-price.component.html',
  styleUrl: './filter-product-by-price.component.css'
})
export class FilterProductByPriceComponent implements OnInit {
  minLimit = 0;
  maxLimit = 5000;
  minValue = 500;
  maxValue = 1000;

  allproducts: IProduct[] = [];
  filteredProductList: IProduct[] = [];

  pageNumber = 1;
  pageSize = 4;
  totalPages = 1;

  constructor(private productService: ProductService) {}
ngOnInit(): void {
    this.productService.getAllProducts(this.pageNumber, this.pageSize).subscribe(response => {
    this.allproducts = response.data.data; 
    this.updatePageData();
  });
  
}
  filterByPrice() {
    this.productService.getProductsByPricesRanges(this.minValue, this.maxValue).subscribe(response => {
      this.allproducts = response.data;
      this.pageNumber = 1; // Reset to first page
      this.totalPages = Math.ceil(this.allproducts.length / this.pageSize);
      this.updatePageData();
    });
  }

  updatePageData() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredProductList = this.allproducts.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.updatePageData();
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.updatePageData();
    }
  }


  addToCart(product: IProduct) {
    // To Do: implement cart logic
  }
}

