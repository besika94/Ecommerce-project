import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  constructor(
    private homeService: ServiceForHome,
    private router: Router,
  ) {}

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
