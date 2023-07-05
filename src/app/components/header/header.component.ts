import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private homeService: ServiceForHome, private router: Router) {}

  ngOnInit(): void {
    this.updatedCartArray = this.homeService.updateCart.subscribe(
      (products) => {
        this.itemsNumberIncart = products.length;
      }
    );
  }

  updatedCartArray: Subscription | undefined;
  itemsNumberIncart: number = this.homeService.cartProducts.length;
  timer: any;
  searchedProduct: ProductCardModel[] = [];

  onSearchInput(value: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!value.length || value === ' ') return (this.searchedProduct = []);
      else
        return (this.searchedProduct = this.homeService.searchProducts(value));
    }, 300);
  }

  onSearchedProduct(product: ProductCardModel) {
    this.homeService.onSingleProduct(product);

    this.router.navigate([`product/${product.id}`]);
    this.searchedProduct = [];
  }

  onBurgerMenu() {
    document.querySelector('.mobile-menu')?.classList.add('show');
  }

  onBurgerClose() {
    document.querySelector('.mobile-menu')?.classList.remove('show');
  }

  ngOnDestroy(): void {
    this.updatedCartArray?.unsubscribe();
  }
}
