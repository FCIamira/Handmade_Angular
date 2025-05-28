import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  subtotal: number = 0;
  deliveryFee: number = 20;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  paymentMethod: string = '';
  selectedPaymentMethod: string = '';


  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigationState = this.router.getCurrentNavigation()?.extras?.state;

    if (navigationState && navigationState['cartItems']) {
      localStorage.setItem('checkoutData', JSON.stringify({
        cartItems: navigationState['cartItems'],
        totalPrice: navigationState['totalPrice']
      }));

      this.cartItems = navigationState['cartItems'];
      this.subtotal = navigationState['totalPrice'] || 0;
    } else {
      const savedData = localStorage.getItem('checkoutData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.cartItems = parsedData.cartItems;
        this.subtotal = parsedData.totalPrice || 0;
      } else {
        this.router.navigate(['/cart']);
        return;
      }
    }

    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.subtotal + this.deliveryFee;
  }

    onPaymentMethodChange(method: string): void {
    this.paymentMethod = method;
  }
  confirmOrder(form: NgForm): void {
  if (form.invalid) {
    form.controls['fullName']?.markAsTouched();
    form.controls['email']?.markAsTouched();
    form.controls['phone']?.markAsTouched();
    form.controls['address']?.markAsTouched();
    form.controls['paymentMethod']?.markAsTouched();
    return;
  }

  
  const orderData = {
    customer: {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      address: this.address
    },
    paymentMethod: this.paymentMethod,
    items: this.cartItems,
    subtotal: this.subtotal,
    deliveryFee: this.deliveryFee,
    total: this.total
  };

  console.log('Order confirmed:', orderData);
  this.router.navigate(["/ordersuccess"])
  localStorage.removeItem('checkoutData');
}
// OnOrderSuccess():void{
//   this.router.navigate(["/ordersuccess"])
// }
}
