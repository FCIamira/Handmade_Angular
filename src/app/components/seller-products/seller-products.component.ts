import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetsellersService } from '../../core/services/getsellers.service';
import { IProduct, ISeller } from '../../core/interfaces/iseller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
  imports:[CommonModule,FormsModule,RouterLink]
})
export class SellerProductsComponent implements OnInit {
  products:ISeller={ 
    sellerId: '',
    storeName: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    products: []
  };
  private readonly _CartService=inject(CartService)
  constructor(
    private route: ActivatedRoute,
    private sellerService: GetsellersService
  ) {}

  ngOnInit(): void {
    const sellerId = this.route.snapshot.paramMap.get('id');
    if (sellerId) {
        this.sellerService.getSellerWithItsProducts(sellerId).subscribe({next:(res)=>
        {
          
          this.products=res.data;
          console.log("product"+res);
        },
        error:(error)=>{
          console.log(error)
        }
        });
    }
  }
  AddToCart(productId:number,quentity:number){
  this._CartService.addProductToCart(productId,quentity).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
}
}