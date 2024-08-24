import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private homeService: ServiceForHome, private router: Router) {}

  cartProductsupdate: Subscription | undefined;
  dataForCartTable = this.homeService.cartProducts;

  onDec(id: number) {
    this.homeService.onDecrease(id);
  }

  onIncr(id: number) {
    this.homeService.onIncrease(id);
  }

  onContinueShopping() {
    this.router.navigate(['products/all']);
  }

  onClearCart() {
    this.homeService.cartProducts.set([]);
    localStorage.removeItem('inCart');
  }
}
