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
export class CartComponent implements OnInit, OnDestroy {
  constructor(private homeService: ServiceForHome, private router: Router) {}

  ngOnInit(): void {
    this.cartProductsupdate = this.homeService.updateCart.subscribe(
      (products) => {
        this.dataForCartTable = products;
      }
    );
  }

  cartProductsupdate: Subscription | undefined;
  dataForCartTable: Array<ProductCardModel> = this.homeService.cartProducts;

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
    this.homeService.updateCart.next((this.homeService.cartProducts = []));
    localStorage.removeItem('inCart');
  }

  ngOnDestroy(): void {
    this.cartProductsupdate?.unsubscribe();
  }
}
