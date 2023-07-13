import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: ServiceForHome, private router: Router) {}

  ngOnInit(): void {
    this.homeService.getBestSellers(4, 1).subscribe((prod: any) => {
      this.tempData = prod.products;
    });
    this.homeService.getFeatured(10, 35).subscribe((prod) => {
      this.featuredProduct = prod.products;
    });
  }

  tempData: Array<ProductCardModel> | undefined;

  featuredProduct: Array<ProductCardModel> | undefined;

  onStartShopping() {
    this.router.navigate(['/all-products']);
  }
}
