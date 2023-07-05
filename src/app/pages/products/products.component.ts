import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private homeService: ServiceForHome,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.category === 'all') {
        this.productsArray = this.homeService.getAllProductsArray();
      } else {
        this.productsArray = this.homeService.getProductsByCategory(
          params.category
        );
      }
    });
  }

  ngOnInit(): void {
    // this.homeService.getAllProducts().subscribe((products) => {
    //   this.productsArray = products.products;
    // });
  }

  productsArray: Array<ProductCardModel> = [];

  page: number = 1;
}
