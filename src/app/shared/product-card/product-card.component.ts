
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  constructor(private wishlistService:WishlistService

  ){

  }
  private readonly _CartService=inject(CartService)
  ngOnInit(): void {
  console.log(' Received product in ProductCardComponent:', this.product);
  }
  @Input() product!: IProduct;
  @Output() addToCartClicked = new EventEmitter<IProduct>();

  AddToCart(id:number,quantity: number) {
    this._CartService.addProductToCart(id,quantity).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
addToWishlist(productId: number): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        console.log('Product added to wishlist:', response);
      
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
   
      }
    });
  }

}
