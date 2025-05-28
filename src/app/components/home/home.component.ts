import { ReviewsComponent } from './../reviews/reviews.component';

import { ProductComponent } from "../product/product.component";
import { Component, inject, OnInit } from '@angular/core';
import { SaledProductComponent } from "../saled-product/saled-product.component";
import { FilterProductByPriceComponent } from "../filter-product-by-price/filter-product-by-price.component";
import { SellersComponent } from "../sellers/sellers.component";

@Component({
  selector: 'app-home',
  imports: [ProductComponent, SaledProductComponent, ProductComponent, FilterProductByPriceComponent, SellersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {


}
