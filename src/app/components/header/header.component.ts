import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
