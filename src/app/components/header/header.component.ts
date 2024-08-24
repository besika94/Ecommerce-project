import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private homeService = inject(ServiceForHome);
  private router = inject(Router);

  itemsNumberIncart = computed(() => this.homeService.cartProducts().length);
  searchedProduct = signal<ProductCardModel[]>([]);
  timer: any;

  onSearchInput(value: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!value.length || value === ' ') return this.searchedProduct.set([]);
      else return this.searchedProduct.set(this.homeService.searchProducts(value));
    }, 300);
  }

  onSearchedProduct(product: ProductCardModel) {
    this.homeService.onSingleProduct(product);

    this.router.navigate([`product/${product.id}`]);
    this.searchedProduct.set([]);
  }

  onUserActions(type: string) {
    this.router.navigateByUrl(`/account/${type}`);
  }

  onBurgerMenu() {
    document.querySelector('.mobile-menu')?.classList.add('show');
  }

  onBurgerClose() {
    document.querySelector('.mobile-menu')?.classList.remove('show');
  }
}
