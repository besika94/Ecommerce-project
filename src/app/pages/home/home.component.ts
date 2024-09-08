import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { productsModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private homeService = inject(ServiceForHome);
  private router = inject(Router);

  bestSellers$: Observable<productsModel> = this.homeService.getBestSellers(4, 1);
  featuredProduct$: Observable<productsModel> = this.homeService.getFeatured(10, 35);

  onStartShopping() {
    this.router.navigate(['products/all']);
  }
}
